-- AlterTable
ALTER TABLE "componentCategories" RENAME CONSTRAINT "categories_pkey" TO "componentCategories_pkey";

-- AlterTable
ALTER TABLE "componentLibraries" RENAME CONSTRAINT "libraries_pkey" TO "componentLibraries_pkey";

-- RenameIndex
ALTER INDEX "categories_value_key" RENAME TO "componentCategories_value_key";

-- RenameIndex
ALTER INDEX "libraries_value_key" RENAME TO "componentLibraries_value_key";
