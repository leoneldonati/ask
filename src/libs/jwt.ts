import { SignJWT } from "jose";

const alg = "RS256";
async function signToken() {
  try {
    console.log(import.meta.env.SECRET_JWT)
    return await new SignJWT()
      .setProtectedHeader({ alg })
      .setExpirationTime("1h")
      .sign(import.meta.env.SECRET_JWT);
  } catch (e) {
    console.log(e)
  }
}

export { signToken };
