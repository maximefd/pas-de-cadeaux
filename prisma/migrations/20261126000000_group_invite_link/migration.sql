-- AlterTable
ALTER TABLE "signup_tokens" ADD COLUMN "reusable" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "signup_tokens" ADD COLUMN "token" TEXT;
