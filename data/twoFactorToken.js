import { db } from '@/lib/prismadb';

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({ where: token });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
