'use server';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/prismadb';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: 'Email already in use!' };

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // TODO : sent verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // return { success: 'Email sent!' };

  return { success: 'Confirmation email sent!' };
};
