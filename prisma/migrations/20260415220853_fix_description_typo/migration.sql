/*
  Warnings:

  - You are about to drop the column `descripction` on the `works` table. All the data in the column will be lost.
  - Added the required column `description` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `works` DROP COLUMN `descripction`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
