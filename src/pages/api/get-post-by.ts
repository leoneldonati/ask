import { postsModel } from "@db";
import { resJson } from "@helpers/response";
import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";

export const GET: APIRoute = async ({request}) => {
  const id = new URL(request.url).searchParams.get('id')?.toString()

  const wrongParam = !id || id === ''

  if (wrongParam) return resJson({ message: 'Error on param @id' }, { status: 400 })

  try {
    const post =  await postsModel.findOne({ _id: new ObjectId(id) })

    if (!post) return resJson({ message: 'This post not exists!' }, { status: 404 })
    
    
    return resJson(post)
  }
  catch (e) {
    return resJson({ message: 'Error on server' }, { status: 500 })
  }
}