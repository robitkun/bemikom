-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ANGGOTA', 'MAHASISWA');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MAHASISWA';