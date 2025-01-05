/*
  Warnings:

  - You are about to drop the column `clientId` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `UserDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDetailsId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userDetailsId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_clientId_fkey";

-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_employeeId_fkey";

-- DropIndex
DROP INDEX "UserDetails_clientId_key";

-- DropIndex
DROP INDEX "UserDetails_employeeId_key";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "userDetailsId" INTEGER;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "userDetailsId" INTEGER;

-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "clientId",
DROP COLUMN "employeeId";

-- CreateIndex
CREATE UNIQUE INDEX "Client_userDetailsId_key" ON "Client"("userDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userDetailsId_key" ON "Employee"("userDetailsId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
