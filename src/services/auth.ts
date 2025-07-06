import { prisma } from "../configs/prismaClient";
import { compare, hash } from "bcrypt";
import { signToken, TokenPayload } from "../utils/jwt";
import { sentReset } from "../utils/mailer";
import { link } from "joi";

interface auth {
  username: string;
  email: string;
  password: string;
  fullname: string;
}

export async function registerService(data: auth) {
  const hashPassword = await hash(data.password, 10);
  const avatarUrl = `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Brian${encodeURIComponent(
    data.username
  )}`;

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashPassword,
      profile: {
        create: {
          fullname: data.fullname,
          avatar: avatarUrl,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  return {
    username: user.username,
    email: user.email,
    avatar: user.profile?.avatar,
  };
}

export async function loginService(data: auth) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new Error("Email is not registered");

  const isValid = await compare(data.password, user.password);
  if (!isValid) throw new Error("Wrong password");

  const payload: TokenPayload = { id: user.id };
  const token = signToken(payload);
  return token;
}

export async function forgotService(data: string) {
  const user = await prisma.user.findUnique({
    where: { email: data },
  });

  if (!user) throw new Error("Email is not registered");

  const payload: TokenPayload = { id: user.id };
  const token = signToken(payload);
  const linkReset = `http://localhost:5173/reset/${token}`;

  await sentReset(data, linkReset);
  return token;
}

export async function resetService(id: string, password: string) {
  const hashPassword = await hash(password, 10);
  await prisma.user.update({
    where: { id },
    data: {
      password: hashPassword,
    },
  });
}
