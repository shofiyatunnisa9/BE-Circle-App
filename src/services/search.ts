import { prisma } from "../configs/prismaClient";
export async function searchUsers(query: string, currentUserId?: string) {
  return await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          profile: {
            fullname: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
      ...(currentUserId && { id: { not: currentUserId } }),
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
    take: 20,
    orderBy: {
      profile: {
        fullname: "asc",
      },
    },
  });
}
