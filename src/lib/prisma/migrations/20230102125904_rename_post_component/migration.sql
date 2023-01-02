/*
  Warnings:

  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `templateLikes` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[twitterUsername]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentLike` to the `templateLikes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";
ALTER TABLE "comments" RENAME CONSTRAINT "comments_postId_fkey" TO "comments_componentId_fkey";

-- DropForeignKey
ALTER TABLE "posts" RENAME CONSTRAINT "posts_authorId_fkey" TO "components_authorId_fkey";

-- DropForeignKey
ALTER TABLE "posts" RENAME CONSTRAINT "posts_category_fkey" TO "components_category_fkey";

-- DropForeignKey
ALTER TABLE "posts" RENAME CONSTRAINT "posts_library_fkey" TO "components_library_fkey";

-- DropForeignKey
ALTER TABLE "templateLikes" RENAME CONSTRAINT "templateLikes_postId_fkey" TO "templateLikes_componentId_fkey";

-- DropIndex
DROP INDEX "users_discordId_key";

-- AlterTable
ALTER TABLE "comments" RENAME COLUMN "postId" TO "componentId";

-- AlterTable
ALTER TABLE "templateLikes" RENAME COLUMN "postId" TO "componentId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "discordId",
ADD COLUMN     "bio" TEXT DEFAULT '',
ADD COLUMN     "location" TEXT,
ADD COLUMN     "tokens" TEXT,
ADD COLUMN     "twitterUsername" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "posts" RENAME TO "components";

-- CreateIndex
CREATE UNIQUE INDEX "users_twitterUsername_key" ON "users"("twitterUsername");
