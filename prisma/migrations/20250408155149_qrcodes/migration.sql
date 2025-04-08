-- CreateTable
CREATE TABLE "ScannedQRcodes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrcodeId" TEXT NOT NULL,

    CONSTRAINT "ScannedQRcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qrcode" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Qrcode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScannedQRcodes" ADD CONSTRAINT "ScannedQRcodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScannedQRcodes" ADD CONSTRAINT "ScannedQRcodes_qrcodeId_fkey" FOREIGN KEY ("qrcodeId") REFERENCES "Qrcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
