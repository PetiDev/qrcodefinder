export default defineEventHandler((event) => {

    const lista = ["asd", "asdasd", "dsadasd", "meow"]
    
    const {word} = getRouterParams(event)

  console.log(word);
  

    if (!word) {
        throw createError({statusCode: 400})
    }

    return {
      data: {
        isValid: lista.includes(word)
      }
    }
  })