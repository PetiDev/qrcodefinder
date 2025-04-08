/*
  Warnings:

  - You are about to drop the `Qrcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScannedQRcodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScannedQRcodes" DROP CONSTRAINT "ScannedQRcodes_qrcodeId_fkey";

-- DropForeignKey
ALTER TABLE "ScannedQRcodes" DROP CONSTRAINT "ScannedQRcodes_userId_fkey";

-- DropTable
DROP TABLE "Qrcode";

-- DropTable
DROP TABLE "ScannedQRcodes";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scanned_qrcodes" (
    "userId" TEXT NOT NULL,
    "qrcodeId" TEXT NOT NULL,

    CONSTRAINT "scanned_qrcodes_pkey" PRIMARY KEY ("qrcodeId","userId")
);

-- CreateTable
CREATE TABLE "qrcodes" (
    "id" TEXT NOT NULL,

    CONSTRAINT "qrcodes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scanned_qrcodes" ADD CONSTRAINT "scanned_qrcodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scanned_qrcodes" ADD CONSTRAINT "scanned_qrcodes_qrcodeId_fkey" FOREIGN KEY ("qrcodeId") REFERENCES "qrcodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
