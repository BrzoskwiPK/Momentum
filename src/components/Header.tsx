import { FC } from 'react'
import Navigation from './Navigation'

const Header: FC = () => {
  return (
    <header className='header w-72px md:w-[244px]'>
      <Navigation />
    </header>
  )
}

export default Header
