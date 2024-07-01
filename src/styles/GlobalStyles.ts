import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'UI Sans';
    src: url('./assets/fonts/ui-sans-v9-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'UI Sans';
    src: url('./assets/fonts/ui-sans-v9-bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'UI Sans', sans-serif;
    height: 100vh;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    }
`;

export default GlobalStyles;