"use server"

import bcrypt from "bcryptjs"
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/config/prisma";
import { getUserByEmail } from "@/lib/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validated = RegisterSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid form data" };
  }

  const { email, password, name } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Sorry, this email is already in use." };
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { success: "User Created" };
};
