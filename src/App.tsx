import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './common.scss'
import RouteError from './components/RouteError'
import Profile from './components/pages/Profile'
import { FC } from 'react'
import Feed from './components/pages/Feed'
import ProtectedRoute from './components/ProtectedRoute'
import UserContextProvider from './components/UserContextProvider'
import SignIn from './components/SignIn'
import Modal from './components/Modal'
import SearchForm from './components/pages/SearchForm'
import Posts from './components/pages/Posts'
import Layout from './components/Layout'

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
            <SearchForm />
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/:profileId'
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
            <Modal title='Logout' text='Are you sure you want to logout?' type='logout' />
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
