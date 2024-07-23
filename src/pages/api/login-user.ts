import type { APIRoute } from "astro";
import { compare } from "@libs/bcrypt";
import { signToken } from "@libs/jwt";
import { usersModel } from "@db";
import { append, resJson } from "@helpers/response";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    if (!formData.get("email") || !formData.get("password"))
      return resJson(
        { message: "You must provide email and password." },
        { status: 401 }
      );

    const { email, password } = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };
    const result = await usersModel.findOne({ email });

    if (!result) {
      return resJson(
        { message: "Wrong credentials or user not registered" },
        { status: 401 }
      );
    }

    const user = result;

    const { ok } = await compare(user.hash, password);

    if (!ok)
      return resJson(
        { message: "Wrong credentials or user not registered" },
        { status: 401 }
      );

    const token = await signToken();

    append('Cookie', token)
    
    return resJson(user);
  } catch (err) {
    return resJson({ message: "Internal server error." }, { status: 500 });
  }
};
