-- AlterTable
ALTER TABLE "Listing" ADD COLUMN "listerEmail" TEXT;
ALTER TABLE "Listing" ADD COLUMN "listerName" TEXT;
ALTER TABLE "Listing" ADD COLUMN "listerPhone" TEXT;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listingId" INTEGER NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactMessage_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ContactMessage_listingId_createdAt_idx" ON "ContactMessage"("listingId", "createdAt");
