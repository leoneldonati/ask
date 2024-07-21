import { postsModel } from "@db";
import { resJson } from "@helpers/response";
import { postsStore } from "@stores/posts";
import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";

export const POST: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const type = params.get("type");
  const from = params.get("from");
  const to = params.get("to");

  try {
    const post = (await postsModel.findOne({ _id: new ObjectId(to) })) as any;
    const hasLiked = post.likes.some((id) => id === from);

    if (!hasLiked) {
      const postLiked = await postsModel.findOneAndUpdate(
        { _id: new ObjectId(to) },
        { $push: { likes: from as never } },
        { returnDocument: "after" }
      );

      await postsStore.set([postLiked]);

      const posts = await postsStore.get();
      console.log("liked", posts);
      return resJson({ post: postLiked, liked: true });
    }

    const postUnliked = await postsModel.findOneAndUpdate(
      { _id: new ObjectId(to) },
      { $pull: { likes: from as never } },
      { returnDocument: "after" }
    );

    console.log("unliked", postUnliked);

    return resJson({ post: postUnliked, liked: false });
  } catch (e) {
    return resJson({ message: "Error on server." }, { status: 500 });
  }
  return resJson({});
};
