// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  future: {
    compatibilityVersion: 4,
  },
  components:[
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  css:[
    "~/assets/css/main.css"
  ],
  modules: ['@nuxt/icon', 'nuxt-qrcode'],
  runtimeConfig:{
    JWT_SECRET: process.env.JWT_SECRET
  }
})