-- CreateTable
CREATE TABLE "step_filds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "errorText" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_filds_pkey" PRIMARY KEY ("id")
);
