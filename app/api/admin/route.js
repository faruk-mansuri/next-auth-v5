import { currentRole } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const role = await currentRole();
  if (role === 'ADMIN') {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
};
