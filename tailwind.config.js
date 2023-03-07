/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '3xs': '375px', // => @media (min-width: 375px) { ... }
      '2xs': '414px', // => @media (min-width: 414px) { ... }
      xs: '496px', // => @media (min-width: 496px) { ... }
      sm: '640px', // => @media (min-width: 640px) { ... }
      md: '768px', // @media (min-width: 768px) { ... }
      lg: '1024px', // @media (min-width: 1024px) { ... }
      xl: '1280px', // @media (min-width: 1280px) { ... }
    },
    extend: {
      width: {
        container: '1440px',
      },

      maxWidth: {
        container: '1440px',
      },

      spacing: {
        container: '18px',
      },

      zIndex: {
        header: 1000,
      },

      colors: {
        ...genColors([
          '21063d',
          '0006',
          'f7f7f8',
          'a1a1a1',
          'fbfbfb',
          '00d37d',
          'ff5b48',
          '969696',
          '666666',
          'f4f4f5',
          'f4f4f4',
          '111111',
          '06c755',
          'dfdfdf',
          'fcfbf8',
          'a1c1d2',
          'c6c6c6',
          '9196a2',
          '4dafa7',
          'd9d9d9',
        ]),
      },
    },
  },
  plugins: [],
}

function genColors(arr) {
  return arr.reduce(
    (colors, color) => ({
      ...colors,
      [color]: `#${color}`,
    }),
    {}
  )
}
