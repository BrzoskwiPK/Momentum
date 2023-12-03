import { FC, useContext } from 'react'
import { isAuthenticated } from '../utils/helpers'
import Header from './Header'
import UserContext from '../contexts/user-context'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  const userContext = useContext(UserContext)
  const authenticatedUser = isAuthenticated(userContext?.user!)

  return (
    <>
      {authenticatedUser ? <Header /> : null}
      <main className='w-full overflow-y-scroll'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
