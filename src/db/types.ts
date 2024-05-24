import { userTable } from './schema';

export type User = typeof userTable.$inferSelect;
