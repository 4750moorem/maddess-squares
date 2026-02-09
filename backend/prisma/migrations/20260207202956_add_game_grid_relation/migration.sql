/*
  Warnings:

  - A unique constraint covering the columns `[gridId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gridId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_gridId_key" ON "Game"("gridId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
