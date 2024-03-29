import { FC } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

const Layout: FC = () => {
  const { isAuthenticated } = useAuthenticatedUser()

  return (
    <>
      {isAuthenticated ? <Header /> : null}
      <main id='mainDocument' className='w-full h-[100vh] overflow-y-scroll'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
