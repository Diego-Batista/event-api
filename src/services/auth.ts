import { Admin } from "@prisma/client";
import { createJwt } from "../libs/jwt";

export const createToken = (user: Admin) => {
  return createJwt({ id: user.id });
};
