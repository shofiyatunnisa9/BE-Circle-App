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

export async function getThread(currentUserId?: string) {
  const threads = await prisma.thread.findMany({
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
      // Get all likes for this thread
      likes: {
        select: {
          userId: true,
        },
      },
      // Get count of replies
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  // Process each thread to add like info
  return threads.map((thread) => {
    // Check if current user has liked this thread
    const userLiked = thread.likes.some(
      (like) => like.userId === currentUserId
    );

    return {
      ...thread,
      isLiked: userLiked,
      likeCount: thread.likes.length,
      replyCount: thread._count.replies,
      likes: undefined, // Remove likes array since we only need count and status
      _count: undefined, // Remove _count object
    };
  });
}

export async function getThreadById(id: string, currentUserId?: string) {
  const thread = await prisma.thread.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              avatar: true,
              fullname: true,
            },
          },
        },
      },
      // Get all likes for this thread
      likes: {
        select: {
          userId: true,
        },
      },
      // Get count of replies
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  if (!thread) return null;

  // Check if current user has liked this thread
  const userLiked = thread.likes.some((like) => like.userId === currentUserId);

  return {
    ...thread,
    isLiked: userLiked,
    likeCount: thread.likes.length,
    replyCount: thread._count.replies,
    likes: undefined,
    _count: undefined,
  };
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
