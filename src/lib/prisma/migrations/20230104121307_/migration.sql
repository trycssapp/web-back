/*
  Warnings:

  - You are about to drop the column `twitterId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUsername` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[githubId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_twitterId_key";

-- DropIndex
DROP INDEX "users_twitterUsername_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "twitterId",
DROP COLUMN "twitterUsername",
ADD COLUMN     "githubId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_githubId_key" ON "users"("githubId");
