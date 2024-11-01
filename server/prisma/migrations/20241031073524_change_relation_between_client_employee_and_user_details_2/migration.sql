/*
  Warnings:

  - You are about to drop the column `userDetailsId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `userDetailsId` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userDetailsId_fkey";

-- DropIndex
DROP INDEX "Client_userDetailsId_key";

-- DropIndex
DROP INDEX "Employee_userDetailsId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "userDetailsId";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "userDetailsId";

-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "employeeId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_clientId_key" ON "UserDetails"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_employeeId_key" ON "UserDetails"("employeeId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
