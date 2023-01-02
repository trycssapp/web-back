/*
  Warnings:

  - You are about to drop the `pageLibraries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_library_fkey";

-- DropTable
DROP TABLE "pageLibraries";

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_library_fkey" FOREIGN KEY ("library") REFERENCES "componentLibraries"("value") ON DELETE SET DEFAULT ON UPDATE CASCADE;
