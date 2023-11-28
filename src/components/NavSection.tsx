import { FC, useContext } from 'react'
import {
  IoHomeOutline,
  IoHomeSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoLogOut,
} from 'react-icons/io5'
import { NavigationItem, UserAccount } from '../types/types'
import CircleIcon from './CircleIcon'
import { IoIosLogOut } from 'react-icons/io'
import UserContext from '../contexts/user-context'
import NavigationPath from './NavigationPath'

const NavSection: FC = () => {
  const userContext = useContext(UserContext)
  const userCredentials: UserAccount = userContext?.user!

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
      iconBase: <CircleIcon imageUrl={`./assets/profile-${userCredentials.id}.jpg`} />,
      iconActive: <CircleIcon imageUrl={`./assets/profile-${userCredentials.id}.jpg`} />,
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
    <section className='flex flex-col flex-grow justify-start'>
      {navigation.map((item, index) => (
        <NavigationPath
          key={index}
          path={item}
          index={index}
          navigationLength={navigation.length}
        />
      ))}
    </section>
  )
}

export default NavSection
