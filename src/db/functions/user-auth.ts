'use server';
import { eq } from 'drizzle-orm';

import { db, userTable } from '..';

import { verifyPassword } from '../util';

export async function dbGetUserByEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const userRows = await db.select().from(userTable).where(eq(userTable.email, email));
  const maybeUser = userRows[0];

  console.log('user', maybeUser);

  if (!maybeUser) {
    return undefined;
  }

  const passwordVerified = await verifyPassword(password, maybeUser.passwordHash);
  if (!passwordVerified) {
    return undefined;
  }

  return maybeUser;
}
