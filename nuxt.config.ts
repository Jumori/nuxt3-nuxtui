// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  imports: {
    autoImport: true
  },

  app: {
    head: {
      title: 'Nuxt 3 + NuxtUI',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  components: [
    '~/components',
    { path: '~/components/Common', pathPrefix: false }
  ],

  css: ['@/assets/css/main.css'],

  modules: [
    '@nuxthq/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          Nunito: [300, 400, 500, 700],
        }
      }
    ]
  ],

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
