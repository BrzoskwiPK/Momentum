import { FC } from 'react'

const NavLogo: FC = () => {
  return (
    <aside className='flex flex-row items-center justify-center w-full h-24 max-[400px]:hidden'>
      <img className='h-10 w-auto' src='./assets/logo.png' alt='WSEI' />
    </aside>
  )
}

export default NavLogo
