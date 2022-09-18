import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'

const App = lazy(() => import('@/pages/app'))
const Login = lazy(() => import('@/pages/auth/login'))
const Register = lazy(() => import('@/pages/auth/register'))
const Notfound = lazy(() => import('@/pages/404'))
const Loading = lazy(() => import('@/pages/loading'))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
