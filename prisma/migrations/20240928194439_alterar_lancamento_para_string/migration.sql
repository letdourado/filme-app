/*
  Warnings:

  - You are about to drop the column `lancamento` on the `Filme` table. All the data in the column will be lost.
  - Added the required column `capa` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "lancamento",
ADD COLUMN     "capa" TEXT NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL;
