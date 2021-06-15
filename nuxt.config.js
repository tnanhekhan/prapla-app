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
    DB_URL: process.env.DB_URL,
    CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL
  },
  buildDir: 'dist',
  components: true,
  serverMiddleware: ['~/server-middleware/index.js'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  plugins: [
    '~/plugins/speech',
    '~/plugins/recognition',
    '~/plugins/loginRecognition'
  ],
  "axios": {
    baseURL: process.env.BASE_URL
  },
  auth: {
    redirect: {
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth', method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  }
}