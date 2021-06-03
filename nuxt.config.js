import dotenv from 'dotenv'
dotenv.config()

export default {
  head: {
    title: 'PraatjePlaatje',
    htmlAttrs: {
      lang: 'nl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  env: {
    DB_URL: process.env.DB_URL
  },
  buildDir: 'dist',
  components: true,
  serverMiddleware: ['~/server-middleware/index.js'],
  modules: ['@nuxtjs/axios'],
  plugins: [
    '~/plugins/speech',
    '~/plugins/recognition'
  ]
}