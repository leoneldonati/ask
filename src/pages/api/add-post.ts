import { postsModel } from "@db";
import type { APIRoute } from "astro";
import { rm } from "fs/promises";
import { ObjectId } from "mongodb";
import { resJson } from "src/helpers/response";
import { uploadFile } from "src/libs/cld";
import { optimizePostAsset } from "src/libs/sharp";

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const content = form.get("content")?.toString();
  const images = form.getAll("images") as File[] | [""];
  const userId = form.get("userId")?.toString();
  if (!content) return resJson({ message: "Wrong content!." }, { status: 400 });

  try {
    let uploadedFiles = null;

    // si hay más de una imagen
    if (images[0] !== "" && images.length > 1) {
      const promises = images
        .map(
          async (file) =>
            await optimizePostAsset(Buffer.from(await file.arrayBuffer()), {
              folder: "posts",
            })
        )
        .map(async (assets) => {
          return (
            await uploadFile((await assets)?.filePath, { folder: "posts" })
          )?.data;
        });

      uploadedFiles = await Promise.all(promises);
    }

    // si hay una sola imagen
    if (images[0] !== "" && images.length === 1) {
      const filePath = (
        await optimizePostAsset(Buffer.from(await images[0].arrayBuffer()), {
          folder: "posts",
        })
      )?.filePath;
      const uploadedFile = (await uploadFile(filePath, { folder: "posts" }))
        ?.data;

      uploadedFiles = [uploadedFile];

      await rm(filePath);
    }

    const postSchema = {
      content,
      ownerId: userId,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      images: uploadedFiles ? uploadedFiles : [],
      likes: [],
      comments: [],
    };

    const savedPost = await postsModel.insertOne(postSchema);

    return resJson({ message: "Posted!", savedPost: {...postSchema, _id: new ObjectId(savedPost?.insertedId)} });
  } catch (e) {
    return resJson({ message: "Error on server." }, { status: 500});
  }
};
