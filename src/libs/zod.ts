import { z } from "astro/zod";
const signPayload = z.object({
  name: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  bio: z.string().optional(),
  date: z.string().optional()
})


function validateUserPayload (payload: FormData) {
  const name = payload.get('name')
  const lastname = payload.get('lastname')
  const username = payload.get('username')
  const email = payload.get('email')
  const password = payload.get('password')
  const bio = payload.get('bio')
  const date = payload.get('date')
  try {
    return signPayload.parse({
      name,
      lastname,
      username,
      email,
      password,
      bio,
      date
    })
  }
  catch(e) {
    return e
  }
}

function validatePostPayload (payload: FormData) {
  
}
export { validateUserPayload }