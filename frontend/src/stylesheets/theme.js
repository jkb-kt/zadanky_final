import { createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    main: '#1203b5',
    white: 'white',
    black: 'black',
    tableHoverColor: '#e2dcf5'
  },
  resolution: {
    screenXSm: '575px',
    screenSm: '721px',
    screenLg: '992px',
    screenXl: '1200px',
    screenXXl: '1800px'
  },
  font_size: {
    small: '.9rem',
    big: '1.3rem',
    bigger: '1.6rem'
  }
}

export const GlobalStyle = createGlobalStyle`
  *, :after, :before {
    box-sizing: border-box;
    margin: 0;
  }

  html, body, #root {
    font-size: 14px;
    font-family: Roboto, sans-serif;
  }

  .row-hover {
    :hover {
      cursor: pointer;
    }
  }

  .ant-menu-item {
    @media only screen and (max-width: ${props => props.theme.resolution.screenXSm}) {
      padding: 0 10px !important;
    }
  }

  .ant-menu-submenu-title {
    @media only screen and (max-width: ${props => props.theme.resolution.screenXSm}) {
      padding: 0 10px !important;
    }
  }

  .ant-form-item {
    margin-bottom: 10px !important;
    text-align: left !important;
  }

  .ant-form-item-control {
    line-height: 0 !important;
  }
`

export default theme
