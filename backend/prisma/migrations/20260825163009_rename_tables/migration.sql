/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacterPower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Episode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Power` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_animeId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterPower" DROP CONSTRAINT "CharacterPower_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterPower" DROP CONSTRAINT "CharacterPower_powerId_fkey";

-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Power" DROP CONSTRAINT "Power_animeId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_animeId_fkey";

-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "CharacterPower";

-- DropTable
DROP TABLE "Episode";

-- DropTable
DROP TABLE "Power";

-- DropTable
DROP TABLE "Season";

-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100),
    "summary" TEXT,
    "thumbnail" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "lifeStory" TEXT,
    "photo" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters_powers" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "powerId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "characters_powers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "synopsis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "powers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "powers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_powers_characterId_powerId_key" ON "characters_powers"("characterId", "powerId");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters_powers" ADD CONSTRAINT "characters_powers_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters_powers" ADD CONSTRAINT "characters_powers_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "powers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "powers" ADD CONSTRAINT "powers_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
