import { FC } from 'react'
import NavLogo from './NavLogo'
import NavSection from './NavSection'

const Navigation: FC = () => {
  return (
    <nav className='h-screen bg-gray-800 text-white flex flex-col w-[72px] md:w-[210px]'>
      <NavLogo />
      <NavSection />
    </nav>
  )
}

export default Navigation
