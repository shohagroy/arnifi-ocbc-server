/*
  Warnings:

  - Added the required column `value` to the `form_steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "form_steps" ADD COLUMN     "value" TEXT NOT NULL;
