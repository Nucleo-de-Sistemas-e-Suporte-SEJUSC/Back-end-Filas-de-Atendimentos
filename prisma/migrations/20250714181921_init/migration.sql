-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ticket_number` VARCHAR(191) NOT NULL,
    `guiche` VARCHAR(191) NULL,
    `service` ENUM('PAV', 'RCN') NOT NULL,
    `queue_type` ENUM('N', 'P') NOT NULL,
    `status` ENUM('AGUARDANDO', 'CHAMADO', 'ATENDIMENTO', 'ATENDIDO', 'AUSENTE') NOT NULL DEFAULT 'AGUARDANDO',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_call_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
