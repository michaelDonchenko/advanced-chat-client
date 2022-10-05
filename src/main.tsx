import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'
import {defaultTheme} from '@/styles/theme'
import Router from '@/routes'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={defaultTheme}>
      <Router />
    </ThemeProvider>
  </QueryClientProvider>
)
