import { postsModel } from "@db";
import type { APIRoute } from "astro";
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
    const result = await postsModel.find({ ownerId: userId }).sort({ createdAt: -1 }).toArray()
    return resJson(result);
  } catch (e) {
    return resJson({ message: "Error on server" }, { status: 500 });
  }
};
