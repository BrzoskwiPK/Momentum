import { FunctionComponent } from 'react'
import { classNames } from '../utils/helpers'
import { Link, useLocation } from 'react-router-dom'
import { NavigationItem } from '../types/types'
import {
  IoHomeOutline,
  IoHomeSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoLogOut,
} from 'react-icons/io5'
import CircleIcon from '../components/CircleIcon'
import { IoIosLogOut } from 'react-icons/io'

const Navigation: FunctionComponent = () => {
  const location = useLocation()

  const navigation: NavigationItem[] = [
    {
      name: 'Feed',
      href: '/feed',
      iconBase: <IoHomeOutline className='text-2xl mr-2' />,
      iconActive: <IoHomeSharp className='text-2xl mr-2' />,
    },
    {
      name: 'Explore',
      href: '/explore',
      iconBase: <IoSearchOutline className='text-2xl mr-2' />,
      iconActive: <IoSearchSharp className='text-2xl mr-2' />,
    },
    {
      name: 'Profile',
      href: '/profile',
      iconBase: <CircleIcon imageUrl='./assets/profile.jpg' />,
      iconActive: <CircleIcon imageUrl='./assets/profile.jpg' />,
      current: true,
    },
    {
      name: 'Logout',
      href: '/logout',
      iconBase: <IoIosLogOut className='text-2xl mr-2' />,
      iconActive: <IoLogOut className='text-2xl mr-2' />,
    },
  ]

  return (
    <nav className='h-full bg-gray-800 text-white flex flex-col w-[72px] md:w-[244px]'>
      <aside className='flex flex-row items-center justify-center w-full h-24'>
        <img className='h-10 w-auto' src='./assets/logo.png' alt='WSEI' />
      </aside>
      <section className='flex flex-col flex-grow justify-start'>
        {navigation.map((item, index) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.current ? 'font-bold text-white' : 'font-medium text-gray-300 mt-0.5',
              'ml-1 md:ml-2 flex flex-row justify-start align-middle text-center hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium w-11/12 hover:cursor-pointer'
            )}
            aria-current={item.current ? 'page' : undefined}
            style={{ marginTop: index === navigation.length - 1 ? 'auto' : undefined }}>
            <span className='my-auto'>
              {location.pathname === item.href ? item.iconActive : item.iconBase}
            </span>
            <span className='ml-1 my-2 invisible md:visible'>{item.name}</span>
          </Link>
        ))}
      </section>
    </nav>
  )
}

export default Navigation
