import tailwindDefaultColors from 'tailwindcss/colors'

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',

  black: '#000',
  white: '#FFF',

  main: {
    400: '#A50034',
    500: '#820034'
  },

  secondary: {
    100: '#D9D9D9',
    200: '#B2B2B2',
    400: '#6B6B6B'
  },

  success: tailwindDefaultColors.green[400],
  error: tailwindDefaultColors.red[400],
  warning: tailwindDefaultColors.amber[400]
}
