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
  ssr: false,
  env: {
    DB_URL: process.env.DB_URL,
    CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL
  },
  buildDir: 'dist',
  components: true,
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  plugins: [
    '~/plugins/speech',
    '~/plugins/recognition',
    '~/plugins/checkAnswer'
  ]
}
