import { colors } from './tailwind.theme'

export default defineAppConfig({
  theme: {
    ...colors
  },

  ui: {
    primary: 'main',
  }
})
