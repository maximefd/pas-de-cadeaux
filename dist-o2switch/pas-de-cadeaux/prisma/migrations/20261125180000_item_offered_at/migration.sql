-- AlterTable
ALTER TABLE "items" ADD COLUMN "offeredAt" DATETIME;

-- Idées déjà offertes : on les range dans l'année en cours
UPDATE "items" SET "offeredAt" = CURRENT_TIMESTAMP WHERE "offered" = true;
