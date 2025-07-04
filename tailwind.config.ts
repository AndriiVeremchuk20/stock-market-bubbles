import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#030303',
      secondary: '#FFFF',
      green: '#008000',
      red: '#FF0000',
      yellow: '#FFFF00',
      blue: '#0000FF',
    },
  },
  plugins: [],
};
export default config;
