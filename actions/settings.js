'use server';

import bcrypt from 'bcryptjs';

import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { db } from '@/lib/prismadb';
import { generateVerificationToken } from '@/lib/tokens';
import { unstable_update } from '@/auth';

export const settings = async (values) => {
  const user = await currentUser();
  if (!user) return { error: 'Unauthorized!' };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: 'Unauthorized!' };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: 'Email already in use!' };

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        email: values.email,
        emailVerified: null,
      },
    });

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) return { error: 'Incorrect password' };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  // SERVER UPDATE
  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: 'Settings updated!' };
};
