
/*
  Warnings:

  - You are about to drop the column `pageLike` on the `layoutLikes` table. All the data in the column will be lost.
  - You are about to drop the column `pageSave` on the `layoutSaves` table. All the data in the column will be lost.
  - Added the required column `layoutLike` to the `layoutLikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layoutSave` to the `layoutSaves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- ALTER TABLE "layoutLikes" DROP CONSTRAINT "layoutLikes_layoutLike_fkey";

-- DropForeignKey
-- ALTER TABLE "layoutSaves" DROP CONSTRAINT "layoutSaves_layoutSave_fkey";

-- AlterTable
ALTER TABLE "layoutCategories" RENAME CONSTRAINT "pageCategories_pkey" TO "layoutCategories_pkey";

-- AlterTable
ALTER TABLE "layoutLikes" RENAME CONSTRAINT "pageLikes_pkey" TO "layoutLikes_pkey";
ALTER TABLE "layoutLikes" RENAME COLUMN "pageLike" TO "layoutLike";

-- AlterTable
ALTER TABLE "layoutSaves" RENAME CONSTRAINT "pageSaves_pkey" TO "layoutSaves_pkey";
ALTER TABLE "layoutSaves" RENAME COLUMN "pageSave" TO "layoutSave";

-- AlterTable
ALTER TABLE "layouts" RENAME CONSTRAINT "pages_pkey" TO "layouts_pkey";
ALTER TABLE "layouts" ADD COLUMN "css" JSONB;

-- AddForeignKey
-- ALTER TABLE "layoutLikes" ADD CONSTRAINT "layoutLikes_layoutLike_fkey" FOREIGN KEY ("layoutLike") REFERENCES "layouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "layoutSaves" ADD CONSTRAINT "layoutSaves_layoutSave_fkey" FOREIGN KEY ("layoutSave") REFERENCES "layouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "pageCategories_value_key" RENAME TO "layoutCategories_value_key";

-- RenameIndex
ALTER INDEX "pages_id_key" RENAME TO "layouts_id_key";
