/*
  Warnings:

  - The `subjects` column on the `TutoringOffer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TutoringOffer" DROP COLUMN "subjects",
ADD COLUMN     "subjects" TEXT[];
