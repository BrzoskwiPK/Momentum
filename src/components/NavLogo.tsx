import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowUpLong } from 'react-icons/fa6'

const NavLogo: FC = () => {
  const navigate = useNavigate()

  const redirectToFeedPage = () => navigate('/feed')

  const handleScrollToTop = () => {
    const targetElement = document.getElementById('page-header')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside className='flex flex-row items-center justify-center w-full h-24 max-[400px]:hidden'>
      <img
        onClick={redirectToFeedPage}
        className='h-10 w-auto hover:cursor-pointer'
        src='./assets/logo.png'
        alt='WSEI'
        id='home'
        aria-label='WSEI logo'
      />
      <div onClick={handleScrollToTop}>
        <FaArrowUpLong className='absolute bottom-[5px] right-[20px] h-8 w-8 z-50 text-black cursor-pointer' />
      </div>
    </aside>
  )
}

export default NavLogo
