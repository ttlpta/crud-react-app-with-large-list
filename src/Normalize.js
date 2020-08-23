import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body { margin:0; font-family: cursive; overflow: hidden}
  h1, ol, ul, li { margin: 0; padding : 0; }
  a { text-decoration: none }
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`

export default GlobalStyle
