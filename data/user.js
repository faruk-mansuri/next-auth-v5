import { db } from '@/lib/prismadb';

export const getUserByEmail = async (email) => {
  const user = await db.user.findUnique({ where: { email } });
  return user;
};

export const getUserById = async (id) => {
  const user = await db.user.findUnique({ where: { id } });
  return user;
};
