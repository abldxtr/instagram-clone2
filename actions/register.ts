"use server";

import * as z from "zod";
// import bcrypt from "bcryptjs";

import db from "@/lib/prisma";
import { RegisterSchema } from "@/index";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields!",
    };
  }

  const { email, password, name } = validatedFields.data;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      //   password: hashedPassword,
      password,
      username: name,
    },
  });

  return {
    success: true,
    message: "you success to register",
  };
};
