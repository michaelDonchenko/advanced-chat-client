import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import Styles from '@/styles/styles'
import useAuthContext from '@/context/authContext'
import useModalContext from '@/context/modalContext'

const App = lazy(() => import('@/pages/app'))
const Login = lazy(() => import('@/pages/auth/login'))
const Register = lazy(() => import('@/pages/auth/register'))
const Notfound = lazy(() => import('@/pages/404'))
const Loading = lazy(() => import('@/pages/loading'))

const Router = () => {
  const {isAuthenticated} = useAuthContext()
  const {isModalOpen} = useModalContext()

  const ProtectedRoutes = () => (isAuthenticated ? <Outlet /> : <Navigate to='/login' />)
  const PublicRoutes = () => (!isAuthenticated ? <Outlet /> : <Navigate to='/' />)

  return (
    <BrowserRouter>
      <Styles isModalOpen={isModalOpen} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<App />} />
          </Route>

          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
