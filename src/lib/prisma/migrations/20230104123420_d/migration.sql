-- DropForeignKey
ALTER TABLE "layouts" DROP CONSTRAINT "layouts_authorId_fkey";

-- AddForeignKey
ALTER TABLE "layouts" ADD CONSTRAINT "layouts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
