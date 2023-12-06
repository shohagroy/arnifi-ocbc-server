/*
  Warnings:

  - You are about to drop the column `countryId` on the `form_steps` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "form_steps" DROP CONSTRAINT "form_steps_countryId_fkey";

-- AlterTable
ALTER TABLE "form_steps" DROP COLUMN "countryId";
