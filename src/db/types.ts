import { z } from 'zod';
import { formFieldTable, formStatusSchema, formTable, userTable } from './schema';

export type UserRow = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;

export type FormStatus = z.infer<typeof formStatusSchema>;
export type FormRow = typeof formTable.$inferSelect;
export type FormInsert = typeof formTable.$inferInsert;
export type FormFieldRow = typeof formFieldTable.$inferSelect;
export type FormFieldInsert = typeof formFieldTable.$inferInsert;
