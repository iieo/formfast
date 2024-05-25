import { z } from 'zod';
import { formStatusSchema, formTable, userTable } from './schema';

export type User = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;

export type FormStatus = z.infer<typeof formStatusSchema>;
export type Form = typeof formTable.$inferSelect;
export type FormInsert = typeof formTable.$inferInsert;
