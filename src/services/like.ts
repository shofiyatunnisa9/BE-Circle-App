import { prisma } from "../configs/prismaClient";

export async function likeThreads(userId: string, threadId: string) {
  const exitingLike = await prisma.like.findUnique({
    where: {
      userId_threadId: {
        userId,
        threadId,
      },
    },
  });

  if (exitingLike) {
    await prisma.like.delete({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    });
    return { liked: false };
  } else {
    await prisma.like.create({
      data: {
        userId,
        threadId,
      },
    });
    return { liked: true };
  }
}
