'use server';
import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/twoFactorConfirmation';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { db } from '@/lib/prismadb';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';

export const login = async (values, callbackUrl) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exists' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO: verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: 'Invalid Code' };

      if (twoFactorToken.token !== code) return { error: 'Invalid Code' };
      const hasExpires = new Date(twoFactorToken.expires) < new Date();
      if (hasExpires) {
        return { error: 'Code expired!' };
      }
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  console.log('CALLBACK', callbackUrl);
  try {
    const user = await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    console.log('USER LOGIN', user);
  } catch (error) {
    console.log('LOGIN ERROR');
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials' };
      }
      return { error: 'Something went wrong' };
    }
    throw error;
  }
};
