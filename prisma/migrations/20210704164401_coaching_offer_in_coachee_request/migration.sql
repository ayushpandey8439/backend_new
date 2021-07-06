/*
  Warnings:

  - Added the required column `offerId` to the `ProjectCoacheeMatchRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectCoacheeMatchRequest" ADD COLUMN     "offerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectCoacheeMatchRequest" ADD FOREIGN KEY ("offerId") REFERENCES "ProjectCoachingOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
