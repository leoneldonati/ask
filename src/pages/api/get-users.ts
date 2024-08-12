import { usersModel } from "@db";
import { resJson } from "@helpers/response";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const username = new URL(request.url).searchParams.get('username')
  try {
    const filterRexeg = new RegExp(username, 'i')

    const usersMatched = await usersModel.find({ username: { $regex: filterRexeg }}).toArray()

    return resJson(usersMatched)
  } catch (err) {
    return resJson({ message: "Error on server" }, { status: 500 });
  }
};
