-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "lancamento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "imdb" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);
