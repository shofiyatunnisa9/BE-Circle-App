import { prisma } from "../configs/prismaClient";

interface thread {
  userId: string;
  content: string;
  images?: string[];
}

export async function createThread(data: thread) {
  const thread = await prisma.thread.create({
    data: {
      userId: data.userId,
      content: data.content,
      images: data.images ? JSON.stringify(data.images) : null,
    },
  });

  return {
    content: thread.content,
    images: thread.images ? JSON.parse(thread.images) : [],
  };
}
