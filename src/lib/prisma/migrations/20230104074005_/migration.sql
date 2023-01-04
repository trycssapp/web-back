/*
  Warnings:

  - You are about to drop the `pageCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pageLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pageSaves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.

*/

-- AlterTable
ALTER TABLE "components" ADD COLUMN     "css" JSONB;
-- DropForeignKey
ALTER TABLE "pageLikes" RENAME CONSTRAINT "pageLikes_pageLike_fkey" TO "layoutLikes_layoutLike_fkey";

-- DropForeignKey
ALTER TABLE "pageLikes" RENAME CONSTRAINT "pageLikes_userId_fkey" TO "layoutLikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "pageSaves" RENAME CONSTRAINT "pageSaves_pageSave_fkey" TO "layoutSaves_layoutSave_fkey";

-- DropForeignKey
ALTER TABLE "pageSaves" RENAME CONSTRAINT "pageSaves_userId_fkey" TO "layoutSaves_userId_fkey";

-- DropForeignKey
ALTER TABLE "pages" RENAME CONSTRAINT "pages_authorId_fkey" TO "layouts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "pages" RENAME CONSTRAINT "pages_category_fkey" TO "layouts_category_fkey";

-- DropForeignKey
ALTER TABLE "pages" RENAME CONSTRAINT "pages_library_fkey" TO "layouts_library_fkey";

ALTER TABLE "pageCategories" RENAME TO "layoutCategories";
ALTER TABLE "pageLikes" RENAME TO "layoutLikes";
ALTER TABLE "pageSaves" RENAME TO "layoutSaves";
ALTER TABLE "pages" RENAME TO "layouts";


