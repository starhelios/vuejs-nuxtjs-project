import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
require('dotenv').config()

const fetcher = require('./app/contentful/fetcher')

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/css/app.css',
    '~/assets/css/end-to-end-solutions.css',
    '~/assets/css/our-philosophy.css',
    '~/assets/css/featured-stories.css',
    '~/assets/css/page.css',
    '~/assets/css/contact-form.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vuelidate',
    { src: '~plugins/ga.js', ssr: false },
    '@/plugins/img'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-WH7K8HX' }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    credentials: false,
    crossdomain: true
  },

  recaptcha: {
    siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    version: 3
  },

  env: {
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_HOST: process.env.CONTENTFUL_HOST,
    FIREBASE_URL: process.env.FIREBASE_URL
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  generate: {
    routes: async () => {
      const data = await fetcher.getContentfulEntities()

      const articleDetailRoute = item =>
        `/article/${item.fields.urlSlug}`

      const urlSlugs = data.pullArticle.map(articleDetailRoute)

      return [
        ...urlSlugs
      ]
    }
  }
}
