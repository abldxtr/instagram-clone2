import db from "@/lib/prisma";
import { unstable_cache } from "@/lib/unstable-cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdCache = unstable_cache(
  (id: string) => {
    const user = db.user.findUnique({ where: { id } });

    return user;
  },
  ["UserId"],
  {
    revalidate: 60 * 60 * 2, // two hours,
  }
);
