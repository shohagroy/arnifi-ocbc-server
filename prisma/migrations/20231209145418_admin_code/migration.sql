/*
  Warnings:

  - You are about to drop the column `postalCode` on the `countries` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "countries_postalCode_key";

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "postalCode";
