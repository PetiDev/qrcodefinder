
export default defineEventHandler(async (event) => {

  const { word } = getRouterParams(event)

  if (!word) throw createError({ statusCode: 400 })



  const words = ["trefort", "sakk", "poker", "blackjack", "tug_of_war", "darts"]


  return {
    data: {
      isValid: words.includes(word)
    }
  }
})