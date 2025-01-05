/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_email_key" ON "UserDetails"("email");
