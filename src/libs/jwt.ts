import jwt from "jsonwebtoken";

export const createJwt = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_KEY as string);
};

export const readJWT = (hash: string) => {
  try {
    return jwt.verify(hash, process.env.JWT_KEY as string);
  } catch (error) {
    console.error("JWT Error", error);
  }
};
