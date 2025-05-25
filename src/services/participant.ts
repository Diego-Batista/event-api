import { prisma } from "../libs/prisma";

type CreateParticipantProps = {
  eventId: string;
  name: string;
  phone: string;
  email: string;
};

export const createParticipant = async ({
  eventId,
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
      eventId,
      email,
      name,
      phone,
    },
  });
};
