import prisma from "~~/lib/prisma"

export default defineEventHandler(async (event) => {

    const qrcodes = await prisma.qrcode.findMany()

    return {qrcodes}
})