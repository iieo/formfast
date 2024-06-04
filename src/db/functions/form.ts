'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { formFieldTable, formSubmissionTable, formTable, userFormMappingTable } from '../schema';
import { FormFieldInsert, FormFieldRow, FormStatus } from '../types';
import { FieldSubmission } from '@/forms/forms';

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

export async function dbGetFormFieldsByFormId(formId: string) {
  return db.select().from(formFieldTable).where(eq(formFieldTable.formId, formId));
}

export async function dbCreateForm(userId: string, name: string) {
  const form = (
    await db
      .insert(formTable)
      .values({
        status: 'active',
        name: name,
        createdBy: userId,
      })
      .returning()
  )[0];
  if (form === undefined) {
    throw new Error('Failed to create form');
  }
  await db.insert(userFormMappingTable).values({ userId, formId: form.id });
  return form.id;
}
export async function dbCreateFormField(content: FormFieldInsert) {
  return (await db.insert(formFieldTable).values(content).returning())[0];
}
export async function dbUpdateFormFields(formFields: FormFieldRow[]) {
  await db.transaction(async (tx) => {
    for (const newFormField of formFields) {
      await tx
        .update(formFieldTable)
        .set(newFormField)
        .where(eq(formFieldTable.id, newFormField.id));
    }
  });
}

export async function dbDeleteFormFieldById(formFieldId: string) {
  await db.delete(formFieldTable).where(eq(formFieldTable.id, formFieldId));
}

export async function dbUpdateFormStatus(formId: string, status: FormStatus) {
  await db.update(formTable).set({ status }).where(eq(formTable.id, formId));
}

export async function dbDeleteFormById(formId: string) {
  await db.delete(formTable).where(eq(formTable.id, formId));
}

export async function dbCreateSubmission(formId: string, submissionContent: FieldSubmission[]) {
  return await db
    .insert(formSubmissionTable)
    .values({
      formId: formId,
      data: submissionContent,
    })
    .returning();
}

export async function dbGetFormSubmissionsByFormId(formId: string) {
  return db.select().from(formSubmissionTable).where(eq(formSubmissionTable.formId, formId));
}
