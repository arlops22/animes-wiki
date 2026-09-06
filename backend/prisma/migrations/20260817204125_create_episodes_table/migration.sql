-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "synopsis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
