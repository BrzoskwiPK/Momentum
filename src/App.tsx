import { Outlet, RouterProvider } from 'react-router-dom'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import './common.scss'

const Root = () => {
  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
