/*
  Warnings:

  - You are about to drop the column `userId` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Translation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userEmail" TEXT NOT NULL,
    "originalCode" TEXT NOT NULL,
    "translatedCode" TEXT NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "translatedLanguage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Translation_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Translation" ("createdAt", "id", "originalCode", "originalLanguage", "translatedCode", "translatedLanguage") SELECT "createdAt", "id", "originalCode", "originalLanguage", "translatedCode", "translatedLanguage" FROM "Translation";
DROP TABLE "Translation";
ALTER TABLE "new_Translation" RENAME TO "Translation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
