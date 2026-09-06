-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100),
    "summary" TEXT,
    "thumbnail" VARCHAR(255),

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);
