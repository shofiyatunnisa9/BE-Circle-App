import { prisma } from "../configs/prismaClient";

export async function likeThreads(userId: string, threadId: string) {
  // Cek apakah user sudah like thread ini
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_threadId: {
        userId,
        threadId,
      },
    },
  });

  // Jika sudah like, hapus like (unlike)
  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    });
    return { liked: false, message: "Thread di-unlike" };
  }
  // Jika belum like, tambah like
  else {
    await prisma.like.create({
      data: {
        userId,
        threadId,
      },
    });
    return { liked: true, message: "Thread di-like" };
  }
}
