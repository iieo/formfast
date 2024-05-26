'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { formTable, userFormMappingTable } from '../schema';
import { FormContent } from '@/forms/forms';
import { FormStatus } from '../types';

export async function dbGetFormsByUserId(userId: string) {
  return db
    .select()
    .from(formTable)
    .where(eq(formTable.createdBy, userId))
    .orderBy(formTable.createdAt);
}

export async function dbGetFormById(formId: string) {
  return (await db.select().from(formTable).where(eq(formTable.id, formId)).limit(1))[0];
}

export async function dbCreateForm(userId: string, name: string) {
  const form = (
    await db
      .insert(formTable)
      .values({
        status: 'active',
        name: name,
        createdBy: userId,
        content: [],
      })
      .returning()
  )[0];
  if (form === undefined) {
    throw new Error('Failed to create form');
  }
  await db.insert(userFormMappingTable).values({ userId, formId: form.id });
  return form.id;
}

export async function dbUpdateFormContent(formId: string, content: FormContent) {
  await db.update(formTable).set({ content }).where(eq(formTable.id, formId));
}

export async function dbUpdateFormStatus(formId: string, status: FormStatus) {
  await db.update(formTable).set({ status }).where(eq(formTable.id, formId));
}

export async function dbDeleteFormById(formId: string) {
  await db.delete(formTable).where(eq(formTable.id, formId));
}
