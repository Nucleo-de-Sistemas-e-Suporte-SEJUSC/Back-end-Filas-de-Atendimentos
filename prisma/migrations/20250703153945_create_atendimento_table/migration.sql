-- CreateTable
CREATE TABLE "attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "queue_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AGUARDANDO',
    "last_call_at" DATETIME NOT NULL,
    "guiche" TEXT
);
