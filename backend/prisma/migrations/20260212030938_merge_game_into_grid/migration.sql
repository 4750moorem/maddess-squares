/*
  Warnings:

  - You are about to drop the column `gameId` on the `GamePlayer` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `Square` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `TempPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `TempPlayer` table. All the data in the column will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameOwners` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gridId,userId]` on the table `GamePlayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gridId,tempUserId]` on the table `GamePlayer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gridId` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Grid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gridId_fkey";

-- DropForeignKey
ALTER TABLE "GamePlayer" DROP CONSTRAINT "GamePlayer_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Square" DROP CONSTRAINT "Square_playerId_fkey";

-- DropForeignKey
ALTER TABLE "_GameOwners" DROP CONSTRAINT "_GameOwners_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameOwners" DROP CONSTRAINT "_GameOwners_B_fkey";

-- DropIndex
DROP INDEX "GamePlayer_gameId_tempUserId_key";

-- DropIndex
DROP INDEX "GamePlayer_gameId_userId_key";

-- AlterTable
ALTER TABLE "GamePlayer" DROP COLUMN "gameId",
ADD COLUMN     "gridId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Grid" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "gameId",
ADD COLUMN     "gridId" TEXT;

-- AlterTable
ALTER TABLE "Square" DROP COLUMN "playerId";

-- AlterTable
ALTER TABLE "TempPlayer" DROP COLUMN "email",
DROP COLUMN "phoneNumber";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "_GameOwners";

-- CreateTable
CREATE TABLE "_GridOwners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GridOwners_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GridOwners_B_index" ON "_GridOwners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayer_gridId_userId_key" ON "GamePlayer"("gridId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayer_gridId_tempUserId_key" ON "GamePlayer"("gridId", "tempUserId");

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GridOwners" ADD CONSTRAINT "_GridOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "Grid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GridOwners" ADD CONSTRAINT "_GridOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
