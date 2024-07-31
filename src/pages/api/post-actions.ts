import { postsModel, usersModel } from "@db";
import { resJson } from "@helpers/response";
import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";

export const POST: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const type = params.get("type");
  const from = params.get("from");
  const to = params.get("to");

  try {
    const post = await postsModel.findOne({ _id: new ObjectId(to) });

    if (type === "like") {
      const hasLiked = post.likes.some((id) => id === from);

      if (!hasLiked) {
        const postLiked = await postsModel.findOneAndUpdate(
          { _id: new ObjectId(to) },
          { $push: { likes: from as never } },
          { returnDocument: "after" }
        );


        return resJson({ post: postLiked, liked: true });
      }

      const postUnliked = await postsModel.findOneAndUpdate(
        { _id: new ObjectId(to) },
        { $pull: { likes: from as never } },
        { returnDocument: "after" }
      );

      return resJson({ post: postUnliked, liked: false });
    }

    if (type === "comment") {
      const payload = await request.json();
      if (payload.content === "")
        return resJson({ message: "The comment is empty!" }, { status: 400 });

      const comment = {
        ...payload,
        createdAt: new Date(),
      };

      const updatedPost = await postsModel.findOneAndUpdate(
        { _id: new ObjectId(to) },
        { $push: { comments: comment as never } },
        { returnDocument: "after" }
      );
      return resJson({
        message: `Comment sent to ${updatedPost.userOwner.name}`,
      });
    }
  } catch (e) {
    return resJson({ message: "Error on server." }, { status: 500 });
  }
};
