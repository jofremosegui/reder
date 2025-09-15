-- CreateTable
CREATE TABLE "Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceEur" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "address" TEXT,
    "lat" REAL,
    "lon" REAL,
    "propertyType" TEXT NOT NULL,
    "operation" TEXT NOT NULL DEFAULT 'RENT',
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "sizeSqm" INTEGER,
    "floor" INTEGER,
    "furnished" BOOLEAN DEFAULT true,
    "hasElevator" BOOLEAN DEFAULT true,
    "hasBalcony" BOOLEAN DEFAULT false,
    "hasAC" BOOLEAN DEFAULT false,
    "heating" BOOLEAN DEFAULT true,
    "petsAllowed" BOOLEAN DEFAULT false,
    "billsIncluded" BOOLEAN DEFAULT false,
    "internetIncluded" BOOLEAN DEFAULT true,
    "depositEur" INTEGER,
    "availableFrom" DATETIME,
    "minTermMonths" INTEGER,
    "maxTermMonths" INTEGER,
    "roommates" INTEGER,
    "genderPref" TEXT DEFAULT 'ANY',
    "source" TEXT DEFAULT 'seed',
    "url" TEXT,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Listing_city_neighborhood_idx" ON "Listing"("city", "neighborhood");

-- CreateIndex
CREATE INDEX "Listing_priceEur_idx" ON "Listing"("priceEur");

-- CreateIndex
CREATE INDEX "Listing_propertyType_idx" ON "Listing"("propertyType");
