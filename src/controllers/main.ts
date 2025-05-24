import { RequestHandler } from "express";
import { z } from "zod";
import { createParticipant } from "../services/participant";

export const sigUpParticipant: RequestHandler = async (req, res) => {
  const schema = z.object({
    name: z.string().min(3),
    phone: z.string().min(10),
    email: z.string().email(),
  });
  const data = schema.safeParse(req.body);

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const newParticipant = await createParticipant(data.data);

  if (!newParticipant) {
    res.status(400).json({ error: "Error creating participant" });
    return;
  }

  //   const token = createToken(newParticipant);

  res.status(201).json({
    message: "User created",
    user: {
      id: newParticipant.id,
      email: newParticipant.email,
      name: newParticipant.name,
      phone: newParticipant.phone,
    },
    // token,
  });
};
