import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {

  const { word } = getRouterParams(event)
  const token = getCookie(event, "authorization");

  const { verifyJWT } = useJwt()


  if (!word) throw createError({ statusCode: 400 })

  if (!token) throw createError({ statusCode: 401 })

  let tokenData = await verifyJWT(token.replace("JWT ", ""));

  if (!tokenData) throw createError({ statusCode: 401, statusMessage: "Access token expired" })



  const user = await prisma.user.findFirst({ where: { id: `${tokenData.id}` } })
  if (!user)throw createError({ statusCode: 401 });

  const qrcode = await prisma.qrcode.findFirst({ where: { id: word } })
  if (!qrcode) throw createError({ statusCode: 404 })

    let response;

    try {
      response = await prisma.scannedQRcodes.create({
      data: {
        User: {
          connect: {
            id: `${tokenData.id}`
          }
        },
        Qrcode: {
          connect: {
            id: qrcode.id
          }
        }
      }
    })
      
    } catch (error) {
      throw createError({statusCode: 400, statusMessage: "Már egyszer beolvastad"})
    }
  


  return {
    data: {
      isValid: response.userId?true:false
    }
  }
})