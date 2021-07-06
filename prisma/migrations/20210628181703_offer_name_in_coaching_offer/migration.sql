/*
  Warnings:

  - Added the required column `offerName` to the `ProjectCoachingOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectCoachingOffer" ADD COLUMN     "offerName" TEXT NOT NULL;
