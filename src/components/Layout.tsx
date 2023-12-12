import { FC } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

const Layout: FC = () => {
  const { isAuthenticated } = useAuthenticatedUser()

  return (
    <>
      {isAuthenticated ? <Header /> : null}
      <main className='w-full overflow-y-scroll'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
