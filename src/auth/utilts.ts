import { dbGetUserById } from '@/db/functions/user';

import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

import { auth } from '.';

import { UserRow } from '@/db/types';

export async function getMaybeSession(): Promise<Session | undefined> {
  const session = await auth();

  if (session === null) {
    return undefined;
  }

  return session;
}

export async function getMaybeUser(): Promise<UserRow | undefined> {
  const session = await getMaybeSession();
  const user = session?.user;

  if (user === undefined) return undefined;

  const dbUser = await dbGetUserById(user.id);

  if (dbUser === undefined) return undefined;

  return dbUser;
}

export async function getSession(): Promise<Session> {
  const session = await getMaybeSession();

  if (session === undefined) {
    redirect('/logout');
  }

  return session;
}

export async function getUser(): Promise<UserRow> {
  const session = await getSession();
  const user = session.user;

  if (user === undefined) {
    redirect('/logout');
  }

  const dbUser = await dbGetUserById(user.id);

  if (dbUser === undefined) {
    redirect('/logout');
  }

  return dbUser;
}
