import { prisma } from "../configs/prismaClient";
interface reply {
  userId: string;
  threadId: string;
  content: string;
  images?: string;
}

export async function createReply(data: reply) {
  try {
    const replies = await prisma.reply.create({
      data: {
        userId: data.userId,
        threadId: data.threadId,
        content: data.content,
        images: data.images ?? null,
      },
    });

    return {
      id: replies.id,
      content: replies.content,
      images: replies.images,
      createdAt: replies.createdAt,
    };
  } catch (error) {
    console.error("Error in createReply:", error);
    throw error;
  }
}

export async function getReply(threadId: string) {
  return await prisma.reply.findMany({
    where: { threadId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              fullname: true,
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
