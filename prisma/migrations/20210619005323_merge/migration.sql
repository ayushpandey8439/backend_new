/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AuthenticationData` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AuthenticationData` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pupil` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pupil` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Pupil` table. All the data in the column will be lost.
  - You are about to drop the column `matching_priority` on the `Pupil` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `isUniversityStudent` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the `CourseInstructorMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseParticipantMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InternshipData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCoachMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCoacheeMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCoachingExpert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCoachingMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCoachingOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TuteeMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorMatchRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutoringMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutoringOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VolunteersOnCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseInstructorMatchRequest" DROP CONSTRAINT "CourseInstructorMatchRequest_offerId_fkey";

-- DropForeignKey
ALTER TABLE "CourseMatch" DROP CONSTRAINT "CourseMatch_instructorMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "CourseMatch" DROP CONSTRAINT "CourseMatch_participantMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "CourseParticipantMatchRequest" DROP CONSTRAINT "CourseParticipantMatchRequest_pupilId_fkey";

-- DropForeignKey
ALTER TABLE "InternshipData" DROP CONSTRAINT "InternshipData_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoachMatchRequest" DROP CONSTRAINT "ProjectCoachMatchRequest_offerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoacheeMatchRequest" DROP CONSTRAINT "ProjectCoacheeMatchRequest_pupilId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoachingExpert" DROP CONSTRAINT "ProjectCoachingExpert_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoachingMatch" DROP CONSTRAINT "ProjectCoachingMatch_coachMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoachingMatch" DROP CONSTRAINT "ProjectCoachingMatch_coacheeMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCoachingOffer" DROP CONSTRAINT "ProjectCoachingOffer_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "TuteeMatchRequest" DROP CONSTRAINT "TuteeMatchRequest_pupilId_fkey";

-- DropForeignKey
ALTER TABLE "TutorMatchRequest" DROP CONSTRAINT "TutorMatchRequest_offerId_fkey";

-- DropForeignKey
ALTER TABLE "TutoringMatch" DROP CONSTRAINT "TutoringMatch_tuteeMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "TutoringMatch" DROP CONSTRAINT "TutoringMatch_tutorMatchRequestId_fkey";

-- DropForeignKey
ALTER TABLE "TutoringOffer" DROP CONSTRAINT "TutoringOffer_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteersOnCourses" DROP CONSTRAINT "VolunteersOnCourses_courseOfferId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteersOnCourses" DROP CONSTRAINT "VolunteersOnCourses_volunteerId_fkey";

-- AlterTable
ALTER TABLE "AuthenticationData" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Pupil" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "grade",
DROP COLUMN "matching_priority";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "isUniversityStudent",
DROP COLUMN "state",
DROP COLUMN "university";

-- DropTable
DROP TABLE "CourseInstructorMatchRequest";

-- DropTable
DROP TABLE "CourseMatch";

-- DropTable
DROP TABLE "CourseOffer";

-- DropTable
DROP TABLE "CourseParticipantMatchRequest";

-- DropTable
DROP TABLE "InternshipData";

-- DropTable
DROP TABLE "ProjectCoachMatchRequest";

-- DropTable
DROP TABLE "ProjectCoacheeMatchRequest";

-- DropTable
DROP TABLE "ProjectCoachingExpert";

-- DropTable
DROP TABLE "ProjectCoachingMatch";

-- DropTable
DROP TABLE "ProjectCoachingOffer";

-- DropTable
DROP TABLE "TuteeMatchRequest";

-- DropTable
DROP TABLE "TutorMatchRequest";

-- DropTable
DROP TABLE "TutoringMatch";

-- DropTable
DROP TABLE "TutoringOffer";

-- DropTable
DROP TABLE "VolunteersOnCourses";

-- DropEnum
DROP TYPE "InternshipModule";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volunteerId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PupilMatchRequest" (
    "id" TEXT NOT NULL,
    "requestor" TEXT NOT NULL,
    "parameters" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerMatchRequest" (
    "id" TEXT NOT NULL,
    "requestor" TEXT NOT NULL,
    "parameters" TEXT[],
    "offerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestMatches" (
    "id" TEXT NOT NULL,
    "pupilReqId" TEXT NOT NULL,
    "volunteerReqId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Admin" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PupilMatchRequest" ADD FOREIGN KEY ("requestor") REFERENCES "Pupil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerMatchRequest" ADD FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerMatchRequest" ADD FOREIGN KEY ("requestor") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMatches" ADD FOREIGN KEY ("pupilReqId") REFERENCES "PupilMatchRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMatches" ADD FOREIGN KEY ("volunteerReqId") REFERENCES "VolunteerMatchRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
