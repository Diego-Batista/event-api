// export const handleCover = async (file: Express.Multer.File) => {
//     try {
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
//         if (allowedTypes.includes(file.mimetype)) {
//             const coverName = `${v4()}-${file.originalname}`
//             await fs.rename(file.path, `public/images/covers/${coverName}`)
//             return coverName
//         }
//     } catch (error) {
//         return false
//     }

import { prisma } from "../libs/prisma";

//     return false
// }

// export const createSlug = async (title: string) => {
//     let newSlug = slug(title)
//     let keepTrying = true
//     let count = 1

//     while (keepTrying) {
//         const post = await getPostBySlug(newSlug)
//         if (!post) {
//             keepTrying = false
//         } else {
//             newSlug = `${slug(title)}-${++count}`
//         }
//     }

//     return newSlug
// }

// export const getEvent = async (slug: string) => {
//     return await prisma.event.findUnique({
//         where: {
//             id,
//         },
//         include: {
//             dispatches: {
//                 include: {
//                     user: {
//                         select: {
//                             id: true,
//                             name: true,
//                             email: true,
//                             avatar: true,
//                         }
//                     }
//                 }
//             }
//         },
//     })
// }

type CreateEventProps = {
  title: string;
  description: string;
  date: string;
};

export const createEvent = async (data: CreateEventProps) => {
  return await prisma.event.create({ data });
};
