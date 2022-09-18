import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'

import Styles from '@/styles/styles'
import {defaultTheme} from '@/styles/theme'
import Router from '@/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={defaultTheme}>
    <Styles />
    <Router />
  </ThemeProvider>
)
