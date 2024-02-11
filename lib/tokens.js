import crypto from 'crypto';
import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuid } from 'uuid';
import { db } from './prismadb';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';

export const generateVerificationToken = async (email) => {
  const token = uuid();
  const oneHour = 1000 * 60 * 60;
  const expires = new Date(new Date().getTime() + oneHour);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email) => {
  const token = uuid();
  const oneHour = 1000 * 60 * 60;
  const expires = new Date(new Date().getTime() + oneHour);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const fiveMinute = 1000 * 60 * 5;
  const expires = new Date(new Date().getTime() + fiveMinute);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
