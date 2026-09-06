-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
