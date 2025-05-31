import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bebas Neue';
    src: url('/fonts/BebasNeue-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', 'Helvetica', Arial, sans-serif;
    color: ${colors.deepBlue};
    background-color: ${colors.lightGray};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bebas Neue', sans-serif;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${colors.deepBlue};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${colors.vibrantYellow};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
  }

  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section {
    padding: 4rem 0;
  }

  .text-center {
    text-align: center;
  }

  .gradient-text {
    background: linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.vibrantYellow} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    .section {
      padding: 3rem 0;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }
    
    .section {
      padding: 2rem 0;
    }
  }
`;

export default GlobalStyles;
