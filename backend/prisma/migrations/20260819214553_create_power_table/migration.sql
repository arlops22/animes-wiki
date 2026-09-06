-- CreateTable
CREATE TABLE "CharacterPower" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "powerId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "CharacterPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharacterPower" ADD CONSTRAINT "CharacterPower_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterPower" ADD CONSTRAINT "CharacterPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
