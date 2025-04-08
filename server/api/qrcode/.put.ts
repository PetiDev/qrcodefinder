import prisma from "~~/lib/prisma"

export default defineEventHandler(async (event) => {

    const qrcode = await prisma.qrcode.create({data:{}})

    return {qrcode}
})