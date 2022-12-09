-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("value") ON DELETE NO ACTION ON UPDATE CASCADE;
