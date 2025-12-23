/*
  Warnings:

  - You are about to drop the column `isHeader` on the `BlogMedia` table. All the data in the column will be lost.
  - You are about to drop the column `isThumbnail` on the `BlogMedia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogMedia" DROP COLUMN "isHeader",
DROP COLUMN "isThumbnail";
