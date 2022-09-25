import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@/store'
import Styles from '@/styles/styles'

const App = lazy(() => import('@/pages/app'))
const Login = lazy(() => import('@/pages/auth/login'))
const Register = lazy(() => import('@/pages/auth/register'))
const Notfound = lazy(() => import('@/pages/404'))
const Loading = lazy(() => import('@/pages/loading'))

const Router = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const ProtectedRoutes = () => (isAuth ? <Outlet /> : <Navigate to='/login' />)
  const PublicRoutes = () => (!isAuth ? <Outlet /> : <Navigate to='/' />)

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
