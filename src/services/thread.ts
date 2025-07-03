import { prisma } from "../configs/prismaClient";

interface thread {
  userId: string;
  content: string;
  images?: string | null;
}

export async function createThread(data: thread) {
  const thread = await prisma.thread.create({
    data: {
      userId: data.userId,
      content: data.content,
      images: data.images ?? null,
    },
  });

  return {
    content: thread.content,
    images: thread.images,
  };
}

export async function getThread() {
  return await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
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
  });
}

export async function getThreadById(id: string) {
  return await prisma.thread.findUnique({
    where: { id },

    select: {
      id: true,
      content: true,
      createdAt: true,
      images: true,
      user: {
        select: {
          username: true,
          profile: {
            select: {
              avatar: true,
              fullname: true,
            },
          },
        },
      },
    },
  });
}

export async function deleteThread(id: string) {
  return await prisma.thread.delete({
    where: { id },
  });
}

export async function updateThread(
  id: string,
  data: { content?: string; images?: string[] }
) {
  return await prisma.thread.update({
    where: { id },
    data: {
      content: data.content,
      images: data.images ? JSON.stringify(data.images) : undefined,
    },
  });
}
