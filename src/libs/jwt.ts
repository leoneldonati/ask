import { SignJWT } from "jose";

const alg = 'RS256'
async function signToken() {
  try {
   return await new SignJWT().setProtectedHeader({ alg }).setExpirationTime('1h').sign(import.meta.env.SECRET_JWT)
  }
  catch (e) {

  }
}

export { signToken }
