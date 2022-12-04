-- AlterTable
ALTER TABLE "libraries" ALTER COLUMN "versions" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "category" DROP NOT NULL;
