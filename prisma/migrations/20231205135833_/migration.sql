/*
  Warnings:

  - You are about to drop the column `stepId` on the `step_filds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `form_steps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stepValue` to the `step_filds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "step_filds" DROP CONSTRAINT "step_filds_stepId_fkey";

-- AlterTable
ALTER TABLE "step_filds" DROP COLUMN "stepId",
ADD COLUMN     "stepValue" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "form_steps_value_key" ON "form_steps"("value");

-- AddForeignKey
ALTER TABLE "step_filds" ADD CONSTRAINT "step_filds_stepValue_fkey" FOREIGN KEY ("stepValue") REFERENCES "form_steps"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
