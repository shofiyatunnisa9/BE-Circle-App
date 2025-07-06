import { prisma } from "../configs/prismaClient";
interface Profile {
  userId: string;
  fullname: string;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
}

export async function editProfile(data: Profile) {
  const { userId, fullname, username, avatar, banner, bio } = data;
  await prisma.user.update({
    where: { id: userId },
    data: { username },
  });
  const updateProfile = await prisma.profile.update({
    where: { userId },
    data: {
      fullname,
      avatar,
      banner,
      bio,
    },
    select: {
      fullname: true,
      avatar: true,
      banner: true,
      bio: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return {
    username: updateProfile.user.username,

    profile: {
      fullname: updateProfile.fullname,
      avatar: updateProfile.avatar,
      banner: updateProfile.banner,
      bio: updateProfile.bio,
    },
  };
}

export async function getProfile(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      profile: {
        select: {
          fullname: true,
          avatar: true,
          banner: true,
          bio: true,
        },
      },
    },
  });
  if (!user) return null;
  return {
    username: user.username,
    fullname: user.profile?.fullname,
    avatar: user.profile?.avatar,
    banner: user.profile?.banner,
    bio: user.profile?.bio,
  };
}
export async function getUserThread(userId: string) {
  const threads = await prisma.thread.findMany({
    where: { userId },
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
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  return threads.map((thread) => {
    const userLiked = thread.likes.some((like) => like.userId === userId);

    return {
      ...thread,
      isLiked: userLiked,
      likeCount: thread.likes.length,
      replyCount: thread._count.replies,
      likes: undefined,
      _count: undefined,
    };
  });
}

export async function getMedia(userId: string) {
  return await prisma.thread.findMany({
    where: {
      userId,
      images: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}
