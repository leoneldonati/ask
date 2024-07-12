import { usersModel } from "@db";
import type { APIRoute } from "astro";
import { ObjectId } from "mongodb";
import { resJson } from "@helpers/response";

export const GET:APIRoute = async ({ request }) => {
  const id = new URL(request.url).searchParams.get('id')

  const wrongParam = !id || typeof id !== 'string'

  if (wrongParam) return resJson({ message: 'Wrong "id" param.' }, { status: 400 })
  try {
    const result = await usersModel.findOne({ _id: new ObjectId(id) })

    return resJson(result)
  }
  catch (e) {
    return resJson({ message: 'Error on server.' }, { status: 500 })
  }
}