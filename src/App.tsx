import { Outlet, RouterProvider } from 'react-router-dom'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import './common.scss'
import RouteError from './components/RouteError'

const Root = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<RouteError />}>
      <Route index element={<Home />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
