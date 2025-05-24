import { prisma } from "../libs/prisma";

type CreateParticipantProps = {
  name: string;
  phone: string;
  email: string;
};

export const createParticipant = async ({
  email,
  name,
  phone,
}: CreateParticipantProps) => {
  email = email.toLowerCase();

  const admin = await prisma.participant.findFirst({
    where: { email },
  });

  if (admin) return false;

  return await prisma.participant.create({
    data: {
      email,
      name,
      phone,
    },
  });
};
