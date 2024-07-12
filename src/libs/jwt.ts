import { SignJWT } from "jose";

const secret = new TextEncoder().encode(import.meta.env.SECRET_JWT)

const alg = 'HS256'
async function signToken() {
  try {
    return await new SignJWT()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg })
      .sign(secret);
  } catch (e) {
    console.log(e)
  }
}

export { signToken };
