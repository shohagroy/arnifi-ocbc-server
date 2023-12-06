/*
  Warnings:

  - A unique constraint covering the columns `[countryId]` on the table `form_steps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "form_steps_countryId_key" ON "form_steps"("countryId");
