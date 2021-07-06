/*
  Warnings:

  - The `state` column on the `Pupil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `state` column on the `Volunteer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH', 'OTHER');

-- AlterTable
ALTER TABLE "Pupil" DROP COLUMN "state",
ADD COLUMN     "state" "State";

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "state",
ADD COLUMN     "state" "State";

-- DropEnum
DROP TYPE "state";
