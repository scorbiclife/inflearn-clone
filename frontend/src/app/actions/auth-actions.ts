"use server";

import { hashPassword } from "@/lib/password-utils";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

type Params = { email: string; password: string };

export async function signUp({ email, password }: Params) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        status: "error",
        message: "이미 존재하는 이메일입니다.",
      } as const;
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: hashPassword(password),
      },
    });

    if (user) {
      return { status: "ok" } as const;
    }
    return { status: "error", message: "알 수 없는 오류입니다." } as const;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "회원가입에 실패했습니다." } as const;
  }
}
