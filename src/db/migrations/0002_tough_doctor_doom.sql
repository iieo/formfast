ALTER TABLE "form" RENAME COLUMN "content" TO "data";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN IF EXISTS "name";