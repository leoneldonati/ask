import type { APIRoute } from "astro";
import { rm } from "node:fs/promises";
import { Users, db, eq } from "astro:db";
import { uploadFile } from "@libs/cld";
import { optimizeAvatar } from "@libs/sharp";
import { validateUserPayload } from "@libs/zod";
import { encrypt } from "@libs/bcrypt";
import { resJson } from "@helpers/response";
import { usersModel } from "@db";
const headers = new Headers();
headers.append("Content-Type", `application/json`);

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // VERIFICAR PAYLOAD DEL CLIENTE
    const result = validateUserPayload(form);
    if (result.issues)
      return resJson({ message: 'You must send more info.', issues: result.issues}, {status: 400 });

    // BUSCAR SI EL EMAIL NO ESTÁ REGISTRADO
    const email = form.get("email")?.toString();
    const existsEmail = await usersModel.findOne({ email })
    if (existsEmail)
      return new Response(
        JSON.stringify({
          message: `This email ${email}; is already registered.`,
        }),
        { headers, status: 400 }
      );

    // BUSCAR SI EL USERNAME NO EXISTE
    const username = form.get("username")?.toString();
    const existsUsername =
      (await db.select().from(Users).where(eq(Users.username, username)))
        .length !== 0;
    if (existsUsername)
      return new Response(
        JSON.stringify({
          message: `This username ${username} is already in use.`,
        }),
        { headers, status: 400 }
      );

    // HASHEAR CONTRASEÑA
    const password = form.get("password")?.toString();
    const { hash } = await encrypt(password);

    // OPTIMIZACIÓN Y SUBIDA DE ARCHIVOS
    const file = form.get("avatar") as File;

    let uploadedFiles = null;
    if (file) {
      const buffer = await file.arrayBuffer();
      const { ok, error, filesPaths } = await optimizeAvatar(buffer, {
        folder: "avatares",
      });
      const promisesArray =
        ok &&
        filesPaths.map((file) =>
          uploadFile(file, { folder: "avatares" })
            .then(({ ok, data }) => ok && data)
            .finally(async () => await rm(file))
        );
      const resolvedPromises = ok && (await Promise.all(promisesArray));

      uploadedFiles = resolvedPromises;
    }

    // GUARDAR USUARIO EN BDD
    const userSchema = {
      id: `${result.username}-${Math.random()}-${crypto.randomUUID()}`,
      name: result.name,
      username: result.username,
      bio: result?.bio ?? "",
      avatar: JSON.stringify(uploadedFiles !== null ? uploadedFiles : []),
      DATE: result?.date !== "" ? result.date : undefined,
      email: result.email,
      hash,
      isVerified: false,
      location: JSON.stringify({}),
      settings: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(Users).values(userSchema);
    return new Response(JSON.stringify({ message: "Signed in." }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers,
    });
  }
};
