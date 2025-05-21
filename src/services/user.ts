import bcrypt from "bcryptjs";
import { prisma } from "../libs/prisma";

type CreateUserProps = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: CreateUserProps) => {
  email = email.toLowerCase();

  const admin = await prisma.admin.findFirst({
    where: { email },
  });

  if (admin) return false;

  const newPassword = bcrypt.hashSync(password, 10);

  return await prisma.admin.create({
    data: {
      email,
      password: newPassword,
    },
  });
};
