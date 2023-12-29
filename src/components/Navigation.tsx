import { FC } from 'react'
import NavLogo from './NavLogo'
import NavSection from './NavSection'

const Navigation: FC = () => {
  return (
    <nav className='max-[400px]:h-12 min-[401px]:h-screen max-[400px]:w-[100vw] min-[401px]:w-[72px] md:w-[210px] bg-gray-800 text-white flex flex-col'>
      <NavLogo />
      <NavSection />
    </nav>
  )
}

export default Navigation
