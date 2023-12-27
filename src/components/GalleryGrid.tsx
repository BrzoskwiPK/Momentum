import { FC, Fragment, useMemo, useState } from 'react'
import AlbumPhotoViewer from './AlbumPhotoViewer'
import { Album, OptionProps, User } from '../types/types'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '../utils/helpers'
import { useUsers } from '../hooks/useUsers'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface GalleryGridProps {
  albums: Album[]
}

const GalleryGrid: FC<GalleryGridProps> = ({ albums }: GalleryGridProps) => {
  const { users } = useUsers()
  const [filteredUser, setFilteredUser] = useState<OptionProps>({ value: 'all', label: 'All' })

  const galleryItems = useMemo(() => {
    return albums
      .filter(
        album =>
          filteredUser === null ||
          filteredUser.value === 'all' ||
          album.userId === Number(filteredUser?.value)
      )
      .map((album: Album) => (
        <div key={album.id} className='w-full flex flex-wrap justify-start'>
          <p className='w-full my-1'>
            <strong>Album: </strong>
            {album.title}
          </p>
          <AlbumPhotoViewer album={album} />
        </div>
      ))
  }, [albums, filteredUser])

  const filteringOptions = useMemo(() => {
    const options = users
      ? users.map((user: User) => ({
          value: String(user.id),
          label: String(user.name),
        }))
      : []

    options.unshift({ value: 'all', label: 'All' })

    return options
  }, [users])

  return (
    <>
      <div className='w-full h-12 flex justify-end mr-12 pt-3'>
        <Transition.Root show={true} as={Fragment}>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                Filter by user
                <ChevronDownIcon
                  className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  {filteringOptions.map((option: OptionProps) => (
                    <Menu.Item key={option.label}>
                      {({ active }) => (
                        <p
                          className={classNames(
                            filteredUser?.value === option.value ? '!font-extrabold' : '',
                            active ? 'bg-gray-100' : '',
                            'z-500 font-medium text-gray-900 block px-4 py-2 text-sm'
                          )}
                          onClick={() => setFilteredUser(option)}>
                          {option.label}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </Transition.Root>
      </div>
      {galleryItems}
    </>
  )
}

export default GalleryGrid
