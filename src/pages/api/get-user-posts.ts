import { usersModel } from "@db";
import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { resJson } from "src/helpers/response";

export const GET: APIRoute = async ({ request }) => {
  const userId = new URL(request.url).searchParams.get("id");

  const wrongReq = !userId || typeof userId !== "string";

  if (wrongReq)
    return resJson(
      { message: "Wrong request, the param id is not valid" },
      { status: 400 }
    );

  try {
    const result = await usersModel.findOne({ _id: new ObjectId(userId)})

    return resJson(result?.posts);
  } catch (e) {
    return resJson({ message: "Error on server" }, { status: 500 });
  }
};
