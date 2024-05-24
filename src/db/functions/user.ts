'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { userTable } from '../schema';
import { hashPassword, verifyPassword } from '../util';

export async function dbCreateNewUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<{ error: string | null }> {
  const maybeUser = await db.select().from(userTable).where(eq(userTable.email, email));
  if (maybeUser.length > 0) {
    return { error: 'Diese Email existiert schon.' };
  }
  await db.insert(userTable).values({
    email,
    passwordHash: await hashPassword(password),
    firstName,
    lastName,
  });

  return { error: null };
}

export async function dbGetAuthenticatedUser(
  email: string,
  password: string,
): Promise<{ id: string; email: string } | undefined> {
  const userModels = await db.select().from(userTable).where(eq(userTable.email, email));
  const userModel = userModels[0];

  if (userModel === undefined) {
    return undefined;
  }

  const passwordVerified = await verifyPassword(password, userModel.passwordHash);
  if (!passwordVerified) {
    return undefined;
  }

  return {
    id: userModel.id,
    email: userModel.email,
  };
}
export async function dbUpdatePassword(email: string, password: string) {
  const row = await db
    .update(userTable)
    .set({
      passwordHash: await hashPassword(password),
    })
    .where(eq(userTable.email, email))
    .returning();

  return row;
}

export async function dbDeleteUserById(userId: string) {
  await db.delete(userTable).where(eq(userTable.id, userId));
}

export async function dbGetUserById(userId: string) {
  const user = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);
  return user[0];
}

export async function dbGetUserByEmail(email: string) {
  const userModels = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
  const userModel = userModels[0];
  return userModel;
}
