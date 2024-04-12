/*
  Warnings:

  - You are about to drop the column `email` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "email",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
