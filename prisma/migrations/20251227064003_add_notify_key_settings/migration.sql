-- CreateTable
CREATE TABLE "NotifyKey" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "name" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotifyKey_pkey" PRIMARY KEY ("key")
);
