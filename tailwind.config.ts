import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customGrayBorder: '#979797',
        customGrayText: '#767676',
        customGrayTitle: '#606060',
        customGrayBg: '#6060600F',
        customSelectedBg: '#EAEAEA',
        customAzure: '#1797FF',
        customGrayBorder1: '#D6D6D6',
      },
    },
  },
  plugins: [],
}
export default config
