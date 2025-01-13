-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN "pricePerHour" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_name_key" ON "Vehicle"("name");
