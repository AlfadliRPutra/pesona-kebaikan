-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "headerImage" TEXT;

-- AlterTable
ALTER TABLE "BlogMedia" ADD COLUMN     "isHeader" BOOLEAN NOT NULL DEFAULT false;
