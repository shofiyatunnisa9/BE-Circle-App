import { prisma } from "../configs/prismaClient";

// Follow atau unfollow user
export async function followService(followerId: string, followingId: string) {
  // Cek apakah sudah follow
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followingId_followerId: {
        followingId,
        followerId,
      },
    },
  });

  // Jika sudah follow, unfollow
  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        followingId_followerId: {
          followingId,
          followerId,
        },
      },
    });
    return { followed: false, message: "Berhasil unfollow" };
  }
  // Jika belum follow, follow
  else {
    await prisma.follow.create({
      data: {
        followingId,
        followerId,
      },
    });
    return { followed: true, message: "Berhasil follow" };
  }
}

// Ambil daftar user yang di-follow oleh current user
export async function getFollowing(userId: string) {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
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

  return following.map((follow) => ({
    id: follow.following.id,
    username: follow.following.username,
    fullname: follow.following.profile?.fullname,
    avatar: follow.following.profile?.avatar,
    followedAt: follow.createdAt,
  }));
}

// Ambil daftar user yang follow current user
export async function getFollowers(userId: string) {
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
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

  return followers.map((follow) => ({
    id: follow.follower.id,
    username: follow.follower.username,
    fullname: follow.follower.profile?.fullname,
    avatar: follow.follower.profile?.avatar,
    followedAt: follow.createdAt,
  }));
}

// Cek apakah current user follow target user
export async function isFollowing(followerId: string, followingId: string) {
  const follow = await prisma.follow.findUnique({
    where: {
      followingId_followerId: {
        followingId,
        followerId,
      },
    },
  });

  return !!follow;
}

// Ambil count following dan followers
export async function getFollowCounts(userId: string) {
  const [followingCount, followersCount] = await Promise.all([
    prisma.follow.count({
      where: { followerId: userId },
    }),
    prisma.follow.count({
      where: { followingId: userId },
    }),
  ]);

  return {
    followingCount,
    followersCount,
  };
}
