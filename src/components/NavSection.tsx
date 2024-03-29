import { FC } from 'react'
import {
  IoHomeOutline,
  IoHomeSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoLogOut,
} from 'react-icons/io5'
import { BiSolidMessageRounded, BiMessageRounded } from 'react-icons/bi'
import { NavigationItem } from '../types/types'
import CircleIcon from './CircleIcon'
import { IoIosLogOut } from 'react-icons/io'
import NavigationPath from './NavigationPath'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

const NavSection: FC = () => {
  const { userContext } = useAuthenticatedUser()

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
      name: 'Posts',
      href: '/posts',
      iconBase: <BiMessageRounded className='text-2xl mr-2' />,
      iconActive: <BiSolidMessageRounded className='text-2xl mr-2' />,
    },
    {
      name: 'Profile',
      href: `/profile`,
      iconBase: (
        <CircleIcon
          size={26}
          imageUrl={`./assets/profile-${userContext?.id}.jpg`}
          withBorder={false}
        />
      ),
      iconActive: (
        <CircleIcon
          size={26}
          imageUrl={`./assets/profile-${userContext?.id}.jpg`}
          withBorder={true}
        />
      ),
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
    <section className='flex min-[401px]:flex-col max-[400px]:flex-row max-[400px]:w-[100vw] overflow-hidden flex-grow justify-start'>
      {userContext ? (
        navigation.map((item, index) => (
          <NavigationPath
            key={index}
            path={item}
            index={index}
            navigationLength={navigation.length}
          />
        ))
      ) : (
        <p className='w-full flex justify-center'>Loading user...</p>
      )}
    </section>
  )
}

export default NavSection
