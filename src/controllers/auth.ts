import { RequestHandler } from "express";
import { z } from "zod";
import { createToken } from "../services/auth";
import { createUser, verifyUser } from "../services/user";

export const sigUp: RequestHandler = async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const data = schema.safeParse(req.body);

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const newUser = await createUser(data.data);

  if (!newUser) {
    res.status(400).json({ error: "Error creating user" });
    return;
  }

  const token = createToken(newUser);

  res.status(201).json({
    message: "User created",
    user: {
      id: newUser.id,
      email: newUser.email,
    },
    token,
  });
};

export const signIn: RequestHandler = async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const data = schema.safeParse(req.body);

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const user = await verifyUser(data.data);
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = createToken(user);
  res.status(200).json({
    message: "User signed in",
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  });
};
