import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../libs/prisma";
import { ExtendedRequest } from "../types/extended-request";

export const addEvent = async (req: ExtendedRequest, res: Response) => {
  //   if (!req.file) return;

  const schema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  });
  const data = schema.safeParse(req.body);
  console.log("Data received", data);
  if (!data.success) {
    console.log("Error in data", data.error);
    res.status(400).json({ error: "Invalid data" });
    return;
  }

  //   if (!req.file) {
  //     res.status(400).json({ error: "No file uploaded" });
  //     return;
  //   }
  //   const coverName = (req.file as Express.Multer.File).path;
  //   // const coverName = await handleCover(req.file)
  //   if (!coverName) {
  //     res.status(400).json({ error: "Invalid file type" });
  //     return;
  //   }

  const newEvent = await prisma.event.create({
    data: {
      title: data.data.title,
      description: data.data.description,
      date: data.data.date,
    },
  });

  res.status(201).json({
    post: {
      id: newEvent.id,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
    },
  });
};

export const getEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.status(200).json(event);
};
