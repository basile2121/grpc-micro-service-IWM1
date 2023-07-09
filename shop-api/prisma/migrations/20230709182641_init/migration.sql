/*
  Warnings:

  - You are about to drop the column `product_id` on the `shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `shop` DROP COLUMN `product_id`,
    ADD COLUMN `productId` INTEGER NULL;
