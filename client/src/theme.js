import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Questrial',
    body: 'Questrial',
  },
  colors: {
    brand: {
      100: "#2E2F30",  //black {header}
      200: "#8DD8E0",  //blue {border color}
      300: "#E3444B",  //red  {buttons}
      400: "#EC7C71",  //orange {button border}
      500: "#FBFAFA",  //white {subheaders, text}
    },
  },
  textStyles: {
    button: {
      letterSpacing: "0.1rem",
    }
  }
})

export default theme