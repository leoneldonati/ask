import type { APIRoute } from "astro";
import { Posts, db } from "astro:db";
import { resJson } from "src/helpers/response";

export const GET:APIRoute = async ({ request }) => {
  const q = new URL(request.url).searchParams.get('q')


  const wrongParam = isNaN(Number(q)) || !q 

  if (wrongParam) return resJson({ message: 'Wrong param "q".' }, { status: 400 })

  try {

    const result = await db.select().from(Posts).limit(parseInt(q))

    console.log(result)
    return resJson(result)
  }
  catch (e) {
    return resJson({ message: 'Error on server.'}, { status: 500 })
  }
}