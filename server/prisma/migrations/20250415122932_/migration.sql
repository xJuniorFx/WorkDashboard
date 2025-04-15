/*
  Warnings:

  - You are about to drop the column `fielUrl` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `assigneUserId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `ProjectManagerUserId` on the `Team` table. All the data in the column will be lost.
  - Added the required column `fileURL` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneUserId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "fielUrl",
ADD COLUMN     "fileURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneUserId",
ADD COLUMN     "assignedUserId" INTEGER;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "ProjectManagerUserId",
ADD COLUMN     "projectManagerUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
