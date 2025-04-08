
export default defineEventHandler(async (event) => {

  const { word } = getRouterParams(event)

  if (!word) throw createError({ statusCode: 400 })



  const words = ["meow", "me", "wowo"]


  return {
    data: {
      isValid: words.includes(word)
    }
  }
})