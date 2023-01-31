/*
  Warnings:

  - You are about to alter the column `completed` on the `to_do_items` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_to_do_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_to_do_items" ("completed", "id", "title") SELECT "completed", "id", "title" FROM "to_do_items";
DROP TABLE "to_do_items";
ALTER TABLE "new_to_do_items" RENAME TO "to_do_items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
