import { FC } from 'react'
import Navigation from './Navigation'

const Header: FC = () => {
  return (
    <header className='header max-[400px]:w-[100vw] min-[401px]:w-[72px] md:w-[244px]'>
      <Navigation />
    </header>
  )
}

export default Header
