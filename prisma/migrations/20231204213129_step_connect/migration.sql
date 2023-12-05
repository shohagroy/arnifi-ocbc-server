-- DropForeignKey
ALTER TABLE "form_steps" DROP CONSTRAINT "form_steps_countryId_fkey";

-- AlterTable
ALTER TABLE "form_steps" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "form_steps" ADD CONSTRAINT "form_steps_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_filds" ADD CONSTRAINT "step_filds_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_filds" ADD CONSTRAINT "step_filds_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "form_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
