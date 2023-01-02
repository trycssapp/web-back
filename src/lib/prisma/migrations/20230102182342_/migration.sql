/*
  Warnings:

  - You are about to drop the `componentLibraries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE "components" DROP CONSTRAINT "components_library_fkey";

-- DropForeignKey
-- ALTER TABLE "pages" DROP CONSTRAINT "pages_library_fkey";

-- DropTable
ALTER TABLE "componentLibraries" RENAME CONSTRAINT "componentLibraries_pkey" TO "libraries_pkey";

ALTER TABLE "componentLibraries" RENAME TO "libraries";
ALTER INDEX "componentLibraries_value_key" RENAME TO "libraries_value_key";

-- CreateTable
-- CREATE TABLE "libraries" (
--     "value" TEXT NOT NULL,
--     "label" TEXT NOT NULL,
--     "versions" TEXT[],
--     "docs" TEXT,

--     CONSTRAINT "libraries_pkey" PRIMARY KEY ("value")
-- );

-- CreateIndex
-- CREATE UNIQUE INDEX "libraries_value_key" ON "libraries"("value");

-- AddForeignKey
-- ALTER TABLE "pages" ADD CONSTRAINT "pages_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "components" ADD CONSTRAINT "components_library_fkey" FOREIGN KEY ("library") REFERENCES "libraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
