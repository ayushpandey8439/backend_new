-- AlterTable
ALTER TABLE "TuteeMatchRequest" ALTER COLUMN "subjects" SET NOT NULL,
ALTER COLUMN "subjects" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TutoringOffer" ALTER COLUMN "subjects" SET NOT NULL,
ALTER COLUMN "subjects" SET DATA TYPE TEXT;
