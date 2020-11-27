const fontFamilySans = `Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
const fontFamilySerif = `"AsimoneBrush", "Georgia", Cambria, "Times New Roman",
Times, serif`

const theme = {
  'max-width': {
    none: 'none',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    full: '100%',
    wrapper: '42rem',
  },
  size: {
    logo: '125px',
    frame: {
      small: '75px',
      big: '125px',
    },
  },
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem	',
  },
  font: {
    family: {
      sans: fontFamilySans,
      serif: fontFamilySerif,
    },
    body: fontFamilySans,
    heading: fontFamilySerif,
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    size: {
      root: '16px',
      0: '0.833rem',
      1: '1rem',
      2: '1.2rem',
      3: '1.44rem',
      4: '1.728rem',
      5: '2.074rem',
      6: '2.488rem',
      7: '2.986rem',
    },
  },
  'line-height': {
    none: 1,
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.625,
  },
  color: {
    primary: '#00adb5',
    text: '#2e353f',
    'text-light': '#4f5969',
    heading: '#00686d',
    'heading-black': '#000',
    accent: '#d1dce5',
    'background-primary': '#fff',
    'background-secondary': '#e2f7f6',
    'background-dark': '#000c',
  },
  'media-queries': {
    mobile: '480px',
    tablet: '690px',
    laptop: '1024px',
    desktop: '1200px',
  },
}

export default theme
