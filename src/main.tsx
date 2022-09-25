import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'

import {defaultTheme} from '@/styles/theme'
import Router from '@/routes'
import {store} from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <Router />
    </ThemeProvider>
  </Provider>
)
