-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "lifeStory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "photo" VARCHAR(255),
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
