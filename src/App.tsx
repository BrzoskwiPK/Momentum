import { RouterProvider } from 'react-router-dom'
import './common.scss'
import { FC } from 'react'
import AppRouter from './router'

const App: FC = () => {
  return <RouterProvider router={AppRouter} />
}

export default App
