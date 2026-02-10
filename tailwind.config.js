const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        body: {
          light: '#FFF1E6',
          dark: '#263238'
        },
        header: {
          light: '#FFF1E6',
          dark: '#263238'
        },
        h1: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#FFFFFF'
        },
        h2: {
          light: '#515E65',
          DEFAULT: '#515E65',
          dark: '#FFFFFF'
        },
        h3: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#FFFFFF'
        },
        h4: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#FFFFFF'
        },
        p: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#FFFFFF'
        },
        gray: {
          light: '#3C4C5D',
          DEFAULT: '#3C4C5D',
          dark: '#3C4C5D'
        },
        menu: {
          light: '#F2DFCE',
          dark: '#455A64'
        },
        'menu-color': {
          light: '#000000',
          dark: '#90A4AE'
        },
        search: {
          light: '#E2CCB8',
          dark: '#37474F'
        },
        op: {
          light: '#D8D5D2',
          dark: '#455A64'
        },
        media: {
          light: '#011938',
          dark: '#011938'
        },
        footer: {
          top: {
            light: '#000000',
            DEFAULT: '#000000',
            dark: '#FFFFFF'
          },
          bottom: {
            light: '#212121',
            DEFAULT: '#212121',
            dark: '#000000'
          },
        },
        blue: {
          350: '#CCE6FF',
          850: '#0F5499'
        },
        red: {
          850: '#C00833'
        },
        bg1: {
          light: '#FFF1E6',
          dark: '#263238'
        },
        bg2: {
          light: '#F2DFCE',
          dark: '#37474F'
        },
        bg3: {
          light: '#D8D5D2',
          dark: '#455A64'
        },
        bg4: {
          light: '#CCE6FF',
          dark: '#455A64'
        },
        bg5: {
          light: '#E6D0BB',
          dark: '#607D8B'
        },
        bg6: {
          light: '#927A63',
          dark: '#FFFFFF'
        },
        bg7: {
          light: '#515E65',
          dark: '#607D8B'
        },
        bg8: {
          light: '#F2E0D0',
          dark: '#455A64'
        },
        bg9: {
          light: '#DBC2AC',
          dark: '#607D8B'
        },
        bg10: {
          light: '#FFF1E6',
          dark: '#455A64'
        },
        bg11: {
          light: '#FFFAF6',
          dark: '#455A64'
        },
      },
      lineHeight: {
        '5.5': '1.375rem'
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
