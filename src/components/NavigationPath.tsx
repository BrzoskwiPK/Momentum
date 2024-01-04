import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '../utils/helpers'
import { NavigationItem } from '../types/types'

interface NavigationPathProps {
  path: NavigationItem
  index: number
  navigationLength: number
}

const NavigationPath: FC<NavigationPathProps> = ({
  path,
  index,
  navigationLength,
}: NavigationPathProps) => {
  const location = useLocation()

  return (
    <Link
      key={path.name}
      to={path.href}
      className={classNames(
        path.current ? 'font-bold text-white' : 'font-medium text-gray-300 mt-0.5',
        'max-[400px]:mx-auto min-[401px]:ml-1 md:ml-2 min-[401px]:px-5 py-2 flex flex-row min-[401px]:justify-start max-[400px]:justify-center align-middle text-center hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium w-11/12 hover:cursor-pointer transition duration-300 ease-in-out'
      )}
      aria-current={path.current ? 'page' : undefined}
      style={{
        marginTop: window.innerWidth >= 401 && index === navigationLength - 1 ? 'auto' : undefined,
      }}>
      <span className='my-auto max-[400px]:flex max-[400px]:items-center max-[400px]:justify-center'>
        {location.pathname === path.href ? path.iconActive : path.iconBase}
      </span>
      <span
        className={`${
          location.pathname === path.href ? 'font-bold' : 'font-normal'
        } ml-1 my-2 max-[400px]:hidden min-[401px]:invisible md:visible`}>
        {path.name}
      </span>
    </Link>
  )
}

export default NavigationPath
