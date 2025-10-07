/*
  Warnings:

  - You are about to drop the column `generatedText` on the `Resume` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "generatedText",
ADD COLUMN     "GeneratedText" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
