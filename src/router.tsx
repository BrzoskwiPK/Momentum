import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './common.scss'
import { Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

import { lazy } from 'react'
import Loading from './components/Loading'

const RouteError = lazy(() => import('./components/pages/RouteError'))
const Profile = lazy(() => import('./components/pages/Profile'))
const Feed = lazy(() => import('./components/pages/Feed'))
const SignIn = lazy(() => import('./components/SignIn'))
const Modal = lazy(() => import('./components/Modal'))
const SearchForm = lazy(() => import('./components/pages/SearchForm'))
const Posts = lazy(() => import('./components/pages/Posts'))
const Layout = lazy(() => import('./components/Layout'))
const OwnProfile = lazy(() => import('./components/OwnProfile'))

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<SignIn />} />
      <Route
        path='/feed'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Feed />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/explore'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <SearchForm />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Posts />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <OwnProfile />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/:profileId'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/logout'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Modal title='Logout' text='Are you sure you want to logout?' type='logout' />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='*'
        element={
          <Suspense fallback={<Loading />}>
            <RouteError />
          </Suspense>
        }
      />
    </Route>
  )
)

export default AppRouter
