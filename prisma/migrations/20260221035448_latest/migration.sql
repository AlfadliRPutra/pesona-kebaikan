-- CreateEnum
CREATE TYPE "CampaignChangeRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "foundationFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "fee" DECIMAL(19,2) NOT NULL DEFAULT 0,
ADD COLUMN     "fundraiserId" TEXT;

-- CreateTable
CREATE TABLE "CampaignCategoryOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CampaignCategoryOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignCategoryExample" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CampaignCategoryExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundraiser" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "target" DECIMAL(19,2) NOT NULL,
    "amiinCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignId" TEXT,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Fundraiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundraiserAmiin" (
    "id" TEXT NOT NULL,
    "fundraiserId" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundraiserAmiin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignChangeRequest" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "extraDays" INTEGER,
    "extraTarget" DECIMAL(19,2),
    "status" "CampaignChangeRequestStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processedById" TEXT,

    CONSTRAINT "CampaignChangeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CampaignCategoryOption_categoryId_idx" ON "CampaignCategoryOption"("categoryId");

-- CreateIndex
CREATE INDEX "CampaignCategoryExample_categoryId_idx" ON "CampaignCategoryExample"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Fundraiser_slug_key" ON "Fundraiser"("slug");

-- CreateIndex
CREATE INDEX "Fundraiser_campaignId_idx" ON "Fundraiser"("campaignId");

-- CreateIndex
CREATE INDEX "Fundraiser_createdById_idx" ON "Fundraiser"("createdById");

-- CreateIndex
CREATE INDEX "FundraiserAmiin_fundraiserId_idx" ON "FundraiserAmiin"("fundraiserId");

-- CreateIndex
CREATE UNIQUE INDEX "FundraiserAmiin_userId_fundraiserId_key" ON "FundraiserAmiin"("userId", "fundraiserId");

-- CreateIndex
CREATE UNIQUE INDEX "FundraiserAmiin_sessionId_fundraiserId_key" ON "FundraiserAmiin"("sessionId", "fundraiserId");

-- CreateIndex
CREATE INDEX "CampaignChangeRequest_campaignId_idx" ON "CampaignChangeRequest"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignChangeRequest_userId_idx" ON "CampaignChangeRequest"("userId");

-- CreateIndex
CREATE INDEX "CampaignChangeRequest_status_idx" ON "CampaignChangeRequest"("status");

-- CreateIndex
CREATE INDEX "Donation_fundraiserId_idx" ON "Donation"("fundraiserId");

-- AddForeignKey
ALTER TABLE "CampaignCategoryOption" ADD CONSTRAINT "CampaignCategoryOption_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CampaignCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignCategoryExample" ADD CONSTRAINT "CampaignCategoryExample_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CampaignCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fundraiser" ADD CONSTRAINT "Fundraiser_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fundraiser" ADD CONSTRAINT "Fundraiser_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundraiserAmiin" ADD CONSTRAINT "FundraiserAmiin_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundraiserAmiin" ADD CONSTRAINT "FundraiserAmiin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignChangeRequest" ADD CONSTRAINT "CampaignChangeRequest_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignChangeRequest" ADD CONSTRAINT "CampaignChangeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
