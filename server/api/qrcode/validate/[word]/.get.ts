export default defineEventHandler(async (event) => {

  const lista = ["asd", "asdasd", "dsadasd", "meow"]

  const { word } = getRouterParams(event)
  const token = getCookie(event, "authorization");

  const { verifyJWT } = useJwt()


  if (!word) throw createError({ statusCode: 400 })

  if (!token) throw createError({ statusCode: 401 })

  let tokenData = await verifyJWT(token.replace("JWT ", ""));

  if (!tokenData) throw createError({ statusCode: 401, statusMessage: "Access token expired" })

    console.log(tokenData.data);
    


  return {
    data: {
      isValid: lista.includes(word)
    }
  }
})