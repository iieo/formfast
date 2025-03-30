'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { formFieldTable, formSubmissionTable, formTable, userFormMappingTable } from '../schema';
import { FormFieldInsert, FormFieldRow, FormStatus } from '../types';
import { FieldSubmission } from '@/forms/forms';
import { getUser } from '@/auth/utilts';

export async function dbGetFormsByUserId() {
  const user = await getUser();
  return db
    .select()
    .from(formTable)
    .where(eq(formTable.createdBy, user.id))
    .orderBy(formTable.createdAt);
}

export async function dbGetFormById(formId: string) {
  await getUser();
  return (await db.select().from(formTable).where(eq(formTable.id, formId)).limit(1))[0];
}

export async function dbGetFormFieldsByFormId(formId: string) {
  await getUser();
  return db.select().from(formFieldTable).where(eq(formFieldTable.formId, formId));
}

export async function dbCreateForm(name: string) {
  const user = await getUser();
  const form = (
    await db
      .insert(formTable)
      .values({
        status: 'active',
        name: name,
        createdBy: user.id,
      })
      .returning()
  )[0];
  if (form === undefined) {
    throw new Error('Failed to create form');
  }
  await db.insert(userFormMappingTable).values({ userId: user.id, formId: form.id });
  return form.id;
}
export async function dbCreateFormField(content: FormFieldInsert) {
  await getUser();
  return (await db.insert(formFieldTable).values(content).returning())[0];
}
export async function dbUpdateFormFields(formFields: FormFieldRow[]) {
  await getUser();
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
  await getUser();
  await db.delete(formFieldTable).where(eq(formFieldTable.id, formFieldId));
}

export async function dbUpdateFormStatus(formId: string, status: FormStatus) {
  await getUser();
  await db.update(formTable).set({ status }).where(eq(formTable.id, formId));
}

export async function dbDeleteFormById(formId: string) {
  await getUser();
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
  await getUser();
  return db.select().from(formSubmissionTable).where(eq(formSubmissionTable.formId, formId));
}
