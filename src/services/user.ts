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

export const verifyUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  email = email.toLowerCase();

  const user = await prisma.admin.findFirst({
    where: { email },
  });

  if (!user) return false;

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) return false;

  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.admin.findUnique({
    where: { id: id.toString() },
    select: {
      id: true,
      email: true,
    },
  });

  if (!user) return false;

  return user;
};
