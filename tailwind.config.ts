import type { Config } from 'tailwindcss'
import { colors } from './tailwind.theme'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        ...colors
      },

      fontFamily: {
        sans: ['Roboto', 'Nunito', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
