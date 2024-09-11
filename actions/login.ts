"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "..";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    LoginSchema.parse({
      email,
      password,
    });

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    };
  }
}
