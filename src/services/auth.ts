import { Admin } from "@prisma/client";
import { Request } from "express";
import { createJwt, readJWT } from "../libs/jwt";
import { TokenPayload } from "../types/token-payload";
import { getUserById } from "./user";

export const createToken = (user: Admin) => {
  return createJwt({ id: user.id });
};

export const verifyRequest = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const authSplit = authorization.split("Bearer ");
    if (authSplit[1]) {
      const payload = readJWT(authSplit[1]);
      if (payload) {
        const userId = (payload as TokenPayload).id;
        const user = await getUserById(userId);
        if (user) {
          return user;
        }
      }
    }
  }

  return false;
};
