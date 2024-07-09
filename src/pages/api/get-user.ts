import type { APIRoute } from "astro";
import { Users, db, eq } from "astro:db";
import { resJson } from "src/helpers/response";

export const GET:APIRoute = async ({ request }) => {
  const id = new URL(request.url).searchParams.get('id')

  const wrongParam = !id || typeof id !== 'string'

  if (wrongParam) return resJson({ message: 'Wrong "id" param.' }, { status: 400 })
  try {
    const result = await db.select().from(Users).where(eq(Users.id, id))

    return resJson(result)
  }
  catch (e) {
    return resJson({ message: 'Error on server.' }, { status: 500 })
  }
}