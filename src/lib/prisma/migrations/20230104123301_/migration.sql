-- DropForeignKey
ALTER TABLE "components" DROP CONSTRAINT "components_authorId_fkey";

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
