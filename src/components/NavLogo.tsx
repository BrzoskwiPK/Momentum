import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NavLogo: FC = () => {
  const navigate = useNavigate()

  const redirectToFeedPage = () => navigate('/feed')

  return (
    <aside className='flex flex-row items-center justify-center w-full h-24 max-[400px]:hidden'>
      <img
        onClick={redirectToFeedPage}
        className='h-10 w-auto hover:cursor-pointer'
        src='./assets/logo.png'
        alt='WSEI'
      />
    </aside>
  )
}

export default NavLogo
