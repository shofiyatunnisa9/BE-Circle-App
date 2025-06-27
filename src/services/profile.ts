import { prisma } from "../configs/prismaClient";

export async function getProfile(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      profile: {
        select: {
          bio: true,
          fullname: true,
          avatar: true,
          banner: true,
        },
      },
    },
  });

  return user;
}
