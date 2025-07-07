/*
  Warnings:

  - Made the column `cpf` on table `attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guiche` on table `attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "queue_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AGUARDANDO',
    "last_call_at" DATETIME NOT NULL,
    "guiche" TEXT NOT NULL
);
INSERT INTO "new_attendance" ("cpf", "created_at", "guiche", "id", "last_call_at", "name", "queue_type", "service", "status", "ticket_number") SELECT "cpf", "created_at", "guiche", "id", "last_call_at", "name", "queue_type", "service", "status", "ticket_number" FROM "attendance";
DROP TABLE "attendance";
ALTER TABLE "new_attendance" RENAME TO "attendance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
