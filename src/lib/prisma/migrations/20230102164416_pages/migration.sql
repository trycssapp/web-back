/*
  Warnings:

  - You are about to drop the column `preferences` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commentLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `libraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `replies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `replyLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templateLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum

-- DropForeignKey
ALTER TABLE "commentLikes" DROP CONSTRAINT "commentLikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "commentLikes" DROP CONSTRAINT "commentLikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_componentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
-- ALTER TABLE "components" DROP CONSTRAINT "components_category_fkey";

-- DropForeignKey
-- ALTER TABLE "components" DROP CONSTRAINT "components_library_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_commentId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "replyLikes" DROP CONSTRAINT "replyLikes_replyId_fkey";

-- DropForeignKey
ALTER TABLE "replyLikes" DROP CONSTRAINT "replyLikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "templateLikes" DROP CONSTRAINT "templateLikes_componentLike_fkey";

-- DropForeignKey
ALTER TABLE "templateLikes" DROP CONSTRAINT "templateLikes_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "preferences";

-- DropTable
-- DROP TABLE "categories";

-- DropTable
DROP TABLE "commentLikes";

-- DropTable
DROP TABLE "comments";

-- DropTable
-- DROP TABLE "libraries";

-- DropTable
DROP TABLE "replies";

-- DropTable
DROP TABLE "replyLikes";

-- DropTable
DROP TABLE "templateLikes";

-- CreateTable
CREATE TABLE "pageLikes" (
    "id" TEXT NOT NULL,
    "pageLike" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" JSONB,
    "description" TEXT,
    "generatedImage" TEXT,
    "animated" BOOLEAN,
    "responsive" BOOLEAN,
    "theme" TEXT,
    "authorId" TEXT NOT NULL,
    "category" TEXT DEFAULT 'Unknown',
    "library" TEXT DEFAULT 'Unknown',
    "libraryVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pageLibraries" (
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "versions" TEXT[],
    "docs" TEXT,

    CONSTRAINT "pageLibraries_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "pageSaves" (
    "id" TEXT NOT NULL,
    "pageSave" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageSaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pageCategories" (
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "pageCategories_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "componentLikes" (
    "id" TEXT NOT NULL,
    "componentLike" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "componentLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
ALTER TABLE "categories" RENAME TO "componentCategories";
ALTER TABLE "libraries" RENAME TO "componentLibraries";


-- CreateTable
CREATE TABLE "componentSaves" (
    "id" TEXT NOT NULL,
    "componentSave" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "componentSaves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_id_key" ON "pages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pageLibraries_value_key" ON "pageLibraries"("value");

-- CreateIndex
CREATE UNIQUE INDEX "pageCategories_value_key" ON "pageCategories"("value");

-- CreateIndex
-- CREATE UNIQUE INDEX "componentCategories_value_key" ON "componentCategories"("value");

-- CreateIndex
-- CREATE UNIQUE INDEX "componentLibraries_value_key" ON "componentLibraries"("value");

-- AddForeignKey
ALTER TABLE "pageLikes" ADD CONSTRAINT "pageLikes_pageLike_fkey" FOREIGN KEY ("pageLike") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageLikes" ADD CONSTRAINT "pageLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_category_fkey" FOREIGN KEY ("category") REFERENCES "pageCategories"("value") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_library_fkey" FOREIGN KEY ("library") REFERENCES "pageLibraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageSaves" ADD CONSTRAINT "pageSaves_pageSave_fkey" FOREIGN KEY ("pageSave") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageSaves" ADD CONSTRAINT "pageSaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "components" ADD CONSTRAINT "components_category_fkey" FOREIGN KEY ("category") REFERENCES "componentCategories"("value") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "components" ADD CONSTRAINT "components_library_fkey" FOREIGN KEY ("library") REFERENCES "componentLibraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "componentLikes" ADD CONSTRAINT "componentLikes_componentLike_fkey" FOREIGN KEY ("componentLike") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "componentLikes" ADD CONSTRAINT "componentLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "componentSaves" ADD CONSTRAINT "componentSaves_componentSave_fkey" FOREIGN KEY ("componentSave") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "componentSaves" ADD CONSTRAINT "componentSaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
