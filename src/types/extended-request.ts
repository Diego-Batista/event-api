import { Admin } from "@prisma/client";
import { Request } from "express";

type UserWithoutPassword = Omit<Admin, "password" | "createdAt" | "updatedAt">;

export type ExtendedRequest = Request & {
  user?: UserWithoutPassword;
};
