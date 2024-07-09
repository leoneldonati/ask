import jwt from "jsonwebtoken";

function signToken(payload: any) {
  return jwt.sign(JSON.stringify(payload), import.meta.env.SECRET_JWT);
}

export { signToken }
