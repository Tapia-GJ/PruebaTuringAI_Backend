/*
  Warnings:

  - You are about to drop the `_userfavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_workgenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_userfavorites` DROP FOREIGN KEY `_UserFavorites_A_fkey`;

-- DropForeignKey
ALTER TABLE `_userfavorites` DROP FOREIGN KEY `_UserFavorites_B_fkey`;

-- DropForeignKey
ALTER TABLE `_workgenres` DROP FOREIGN KEY `_WorkGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_workgenres` DROP FOREIGN KEY `_WorkGenres_B_fkey`;

-- DropTable
DROP TABLE `_userfavorites`;

-- DropTable
DROP TABLE `_workgenres`;

-- CreateTable
CREATE TABLE `work_genres` (
    `workId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`workId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favorites` (
    `userId` INTEGER NOT NULL,
    `workId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `work_genres` ADD CONSTRAINT `work_genres_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `works`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_genres` ADD CONSTRAINT `work_genres_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorites` ADD CONSTRAINT `user_favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorites` ADD CONSTRAINT `user_favorites_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `works`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
