// styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      background: {
        main: string
        dark: string
        light: string
      }
      primary: {
        main: string
        dark: string
        light: string
      }
      gray: {
        main: string
      }
      text: string
      success: string
      error: string
      warning: string
    }
    breakpoints: {
      mobile: string
    }
  }
}
