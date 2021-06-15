/*
  Warnings:

  - A unique constraint covering the columns `[pupilReqId,volunteerReqId]` on the table `RequestMatches` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RequestMatches" DROP CONSTRAINT "RequestMatches_pupilReqId_fkey";

-- DropForeignKey
ALTER TABLE "RequestMatches" DROP CONSTRAINT "RequestMatches_volunteerReqId_fkey";

-- AlterTable
ALTER TABLE "PupilMatchRequest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "parameters" SET NOT NULL,
ALTER COLUMN "parameters" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RequestMatches" ADD COLUMN     "pupilMatchRequestId" TEXT,
ADD COLUMN     "volunteerMatchRequestId" TEXT;

-- AlterTable
ALTER TABLE "VolunteerMatchRequest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "parameters" SET NOT NULL,
ALTER COLUMN "parameters" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RequestMatches.pupilReqId_volunteerReqId_unique" ON "RequestMatches"("pupilReqId", "volunteerReqId");

-- AddForeignKey
ALTER TABLE "RequestMatches" ADD FOREIGN KEY ("pupilMatchRequestId") REFERENCES "PupilMatchRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMatches" ADD FOREIGN KEY ("volunteerMatchRequestId") REFERENCES "VolunteerMatchRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
