import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'
import {defaultTheme} from '@/styles/theme'
import Router from '@/routes'
import {store} from '@/store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <Router />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
)
