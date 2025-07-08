import { prisma } from "../configs/prismaClient";

export async function suggestFollow(userId: string) {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const alreadyFollowingIds = following.map((f) => f.followingId);

  const suggestedUsers = await prisma.user.findMany({
    where: {
      id: {
        notIn: [userId, ...alreadyFollowingIds],
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return suggestedUsers;
}
