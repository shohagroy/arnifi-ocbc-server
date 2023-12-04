-- AlterTable
ALTER TABLE "step_filds" ALTER COLUMN "errorText" DROP NOT NULL,
ALTER COLUMN "isRequired" SET DEFAULT false;

-- CreateTable
CREATE TABLE "form_steps" (
    "id" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form_steps" ADD CONSTRAINT "form_steps_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
