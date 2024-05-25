'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { dbGetUserByEmail } from '@/db/functions/user';
import type { Session } from 'next-auth';
// @ts-expect-error
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function getValidSession(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect('/login');
  }

  return session;
}

export async function getMaybeSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  return session;
}

export async function getUser() {
  const session = await getValidSession();
  const { email } = session.user;
  const user = await dbGetUserByEmail(email);
  if (user === undefined) {
    redirect('/logout');
  }
  return user;
}
