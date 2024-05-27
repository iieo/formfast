import { FormField, FormSubmission } from '@/forms/forms';
import { integer, json, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const userTable = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  // we do not need a salt here as our hashing library 'bcrypt' already takes care of that
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const formStatusSchema = z.enum(['active', 'disabled', 'deleted', 'archived', 'draft']);
export const formStatusSchemaEnum = pgEnum('form_status', formStatusSchema.options);

export const formTable = pgTable('form', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().default('Form'),
  status: formStatusSchemaEnum('form_status').notNull().default('active'),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => userTable.id),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
export const formFieldTable = pgTable('form_field', {
  id: uuid('id').defaultRandom().primaryKey(),
  formId: uuid('form_id')
    .notNull()
    .references(() => formTable.id),
  content: json('content').$type<FormField>().notNull(),
  position: integer('position').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const formSubmissionTable = pgTable('form_submission', {
  id: uuid('id').defaultRandom().primaryKey(),
  formId: uuid('form_id')
    .notNull()
    .references(() => formTable.id),
  data: json('data').$type<FormSubmission>().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const userFormMappingTable = pgTable('user_form_mapping', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  formId: uuid('form_id')
    .notNull()
    .references(() => formTable.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
