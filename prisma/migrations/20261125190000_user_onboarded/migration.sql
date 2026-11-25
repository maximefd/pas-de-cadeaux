-- AlterTable
ALTER TABLE "user" ADD COLUMN "onboardedAt" DATETIME;

-- Les comptes déjà existants n'ont pas besoin de l'écran de bienvenue.
UPDATE "user" SET "onboardedAt" = CURRENT_TIMESTAMP;
