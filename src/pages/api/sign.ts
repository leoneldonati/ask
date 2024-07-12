import type { APIRoute } from "astro";
import { rm } from "node:fs/promises";
import { uploadFile } from "@libs/cld";
import { optimizeAvatar } from "@libs/sharp";
import { validateUserPayload } from "@libs/zod";
import { encrypt } from "@libs/bcrypt";
import { resJson } from "@helpers/response";
import { usersModel } from "@db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // VERIFICAR PAYLOAD DEL CLIENTE
    const result = validateUserPayload(form);
    if (result.issues)
      return resJson(
        { message: "You must send more info.", issues: result.issues },
        { status: 400 }
      );

    // BUSCAR SI EL EMAIL NO ESTÁ REGISTRADO
    const email = form.get("email")?.toString();
    const existsEmail = await usersModel.findOne({ email });
    if (existsEmail)
      return resJson(
        {
          message: `This email ${email}; is already registered.`,
        },
        { status: 400 }
      );

    // BUSCAR SI EL USERNAME NO EXISTE
    const username = form.get("username")?.toString();
    const existsUsername = await usersModel.findOne({ username });
    if (existsUsername)
      return resJson(
        {
          message: `This username @${username} is already in use.`,
        },
        { status: 400 }
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
            .then(({ data }) => data)
            .finally(async () => await rm(file))
        );
      const resolvedPromises = await Promise.all(promisesArray);

      uploadedFiles = resolvedPromises;
    }

    // GUARDAR USUARIO EN BDD
    const userSchema = {
      name: result.name,
      username: result.username,
      bio: result?.bio ?? "",
      avatar: uploadedFiles !== null ? uploadedFiles : [],
      date: result?.date !== "" ? result.date : undefined,
      email: result.email,
      hash,
      isVerified: false,
      location: {},
      settings: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      followers: [],
      followed: [],
      posts: []
    };

    console.log(userSchema);
    await usersModel.insertOne(userSchema);

    return resJson({ message: "Signed in." });
  } catch (err) {
    console.log(err);
    return resJson({ message: "Error on server" }, { status: 500 });
  }
};
