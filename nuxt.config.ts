// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  imports: {
    autoImport: true
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        }
      ]
    }
  },

  components: [
    '~/components',
    { path: '~/components/Common', pathPrefix: false }
  ],

  css: ['@/assets/css/main.css'],

  modules: ['@nuxthq/ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE,
      NUXT_PUBLIC_API_ENV: process.env.NUXT_PUBLIC_API_ENV
    }
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },

  ui: {
    global: true,
    icons: ['mdi', 'heroicons']
  },

  nitro: {
    devServer: {
      watch: ['./']
    },

    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
