/*
  Warnings:

  - You are about to drop the `shopproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `shop` ADD COLUMN `product_id` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `shopproduct`;
