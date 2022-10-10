import { Global } from '@emotion/react';

const Fonts = () => (
    <Global
        styles={`
      /* Thin */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Light.woff2') format('woff2'), url('../assets/fonts/Graphik-Light.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Thin */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Thin.woff2') format('woff2'), url('../assets/fonts/Graphik-Thin.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Regular */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Regular.woff2') format('woff2'), url('../assets/fonts/Graphik-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Medium */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Medium.woff2') format('woff2'), url('../assets/fonts/Graphik-Medium.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Semibold */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Semibold.woff2') format('woff2'), url('../assets/fonts/Graphik-Semibold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Bold */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Bold.woff2') format('woff2'), url('../assets/fonts/Graphik-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Black */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Black.woff2') format('woff2'), url('../assets/fonts/Graphik-Black.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Super */
      @font-face {
        font-family: 'Graphik';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('../assets/fonts/Graphik-Super.woff2') format('woff2'), url('../assets/fonts/Graphik-Super.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      `}
    />
);

export default Fonts;
