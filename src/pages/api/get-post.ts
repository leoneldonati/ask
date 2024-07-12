import { postsModel } from "@db";
import type { APIRoute } from "astro";
import { resJson } from "src/helpers/response";

export const GET:APIRoute = async ({ request }) => {
  const q = new URL(request.url).searchParams.get('q')


  const wrongParam = isNaN(Number(q)) || !q 

  if (wrongParam) return resJson({ message: 'Wrong param "q".' }, { status: 400 })

  try {

    const result = await postsModel.find({}).limit(Number(q)).toArray()
    
    return resJson(result)
  }
  catch (e) {
    console.log(e)
    return resJson({ message: 'Error on server.'}, { status: 500 })
  }
}