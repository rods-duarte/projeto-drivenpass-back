/*
  Warnings:

  - The values [All] on the enum `cardType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "cardType_new" AS ENUM ('Credit', 'Debit', 'Both');
ALTER TABLE "cards" ALTER COLUMN "type" TYPE "cardType_new" USING ("type"::text::"cardType_new");
ALTER TYPE "cardType" RENAME TO "cardType_old";
ALTER TYPE "cardType_new" RENAME TO "cardType";
DROP TYPE "cardType_old";
COMMIT;
