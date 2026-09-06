/*
  Warnings:

  - A unique constraint covering the columns `[characterId,powerId]` on the table `CharacterPower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterPower_characterId_powerId_key" ON "CharacterPower"("characterId", "powerId");
