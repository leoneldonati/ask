import { postsModel } from "@db";
import { resJson } from "@helpers/response";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  try {
      const newPosts = await postsModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - FIFTEEN_MINUTES) },
      })
    return resJson({ newPosts });
  } catch (e) {
    return resJson({ message: "Error on server" }, { status: 500 });
  }
};
