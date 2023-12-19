import { FC, useEffect, useState } from 'react'
import Navigation from './Navigation'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

const Header: FC = () => {
  const [isReady, setIsReady] = useState(false)

  const { isAuthenticated } = useAuthenticatedUser()

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <header className='header w-72px md:w-[244px]'>
      {isAuthenticated ? <Navigation /> : null}
    </header>
  )
}

export default Header
