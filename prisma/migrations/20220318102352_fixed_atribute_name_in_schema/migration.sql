/*
  Warnings:

  - You are about to drop the column `rommNumber` on the `room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomNumber]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomNumber` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "room_rommNumber_key";

-- AlterTable
ALTER TABLE "room" DROP COLUMN "rommNumber",
ADD COLUMN     "roomNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "room_roomNumber_key" ON "room"("roomNumber");
