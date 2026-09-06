-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_animeId_fkey";

-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_animeId_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
