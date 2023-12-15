import { FC } from 'react'
import Navigation from './Navigation'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

const Header: FC = () => {
  const { isAuthenticated } = useAuthenticatedUser()

  return (
    <header className='header w-72px md:w-[244px]'>
      {isAuthenticated ? <Navigation /> : null}
    </header>
  )
}

export default Header
