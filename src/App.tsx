import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Header from './components/Header'
import './common.scss'
import RouteError from './components/RouteError'
import Profile from './components/Profile'
import { FC, useContext } from 'react'
import Feed from './components/Feed'
import ProtectedRoute from './components/ProtectedRoute'
import UserContextProvider from './components/UserContextProvider'
import SignIn from './components/SignIn'
import UserContext from './contexts/user-context'
import { isAuthenticated } from './utils/helpers'
import Logout from './components/Logout'

const Layout: FC = () => {
  const userContext = useContext(UserContext)
  const authenticatedUser = isAuthenticated(userContext?.user!)

  return (
    <>
      {authenticatedUser ? <Header /> : null}
      <main className='w-full'>
        <Outlet />
      </main>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<SignIn />} />
      <Route
        path='/feed'
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path='/explore'
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/logout'
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<RouteError />} />
    </Route>
  )
)

const App: FC = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
