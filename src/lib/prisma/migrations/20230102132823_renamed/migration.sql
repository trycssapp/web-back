/*
  Warnings:

  - You are about to drop the column `componentId` on the `templateLikes` table. All the data in the column will be lost.
  - Added the required column `componentLike` to the `templateLikes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "templateLikes" DROP CONSTRAINT "templateLikes_componentId_fkey";

-- AlterTable
ALTER TABLE "components" RENAME CONSTRAINT "posts_pkey" TO "components_pkey";

-- AlterTable
ALTER TABLE "templateLikes" DROP COLUMN "componentId",
ADD COLUMN     "componentLike" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "templateLikes" ADD CONSTRAINT "templateLikes_componentLike_fkey" FOREIGN KEY ("componentLike") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "posts_id_key" RENAME TO "components_id_key";
