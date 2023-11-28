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
        'ml-1 md:ml-2 flex flex-row justify-start align-middle text-center hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium w-11/12 hover:cursor-pointer transition duration-300 ease-in-out'
      )}
      aria-current={path.current ? 'page' : undefined}
      style={{ marginTop: index === navigationLength - 1 ? 'auto' : undefined }}>
      <span className='my-auto'>
        {location.pathname === path.href ? path.iconActive : path.iconBase}
      </span>
      <span className='ml-1 my-2 invisible md:visible'>{path.name}</span>
    </Link>
  )
}

export default NavigationPath
