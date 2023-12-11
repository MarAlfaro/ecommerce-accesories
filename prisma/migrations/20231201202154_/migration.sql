-- CreateTable
CREATE TABLE `tbl_products` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `nombre` TEXT NOT NULL,
    `descripcion` TEXT NULL,
    `imagen_url` TEXT NULL,
    `precio` DOUBLE NULL,
    `inventario` INTEGER NULL,
    `id_categoria` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tbl_products_id_categoria_idx`(`id_categoria`),
    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categorias` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,

    UNIQUE INDEX `tbl_categorias_nombre_key`(`nombre`),
    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_adjuntos` (
    `id_adjunto` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tbl_adjuntos_id_producto_idx`(`id_producto`),
    PRIMARY KEY (`id_adjunto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_products` ADD CONSTRAINT `tbl_products_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categorias`(`id_categoria`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_adjuntos` ADD CONSTRAINT `tbl_adjuntos_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `tbl_products`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
