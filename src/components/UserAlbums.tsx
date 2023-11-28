import { FC, useEffect, useState } from 'react'
import { Album } from '../types/types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface UserAlbumsProps {
  albums: Album[]
}

const UserAlbums: FC<UserAlbumsProps> = ({ albums }: UserAlbumsProps) => {
  const [startIndex, setStartIndex] = useState<number>(0)
  const [albumsToShow, setAlbumsToShow] = useState<number>(6)

  const showNextAlbums = () => {
    setStartIndex(prevIndex => prevIndex + 1)
  }

  const showPrevAlbums = () => {
    setStartIndex(prevIndex => prevIndex - 1)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 380) setAlbumsToShow(1)
      else if (window.innerWidth <= 640) setAlbumsToShow(2)
      else if (window.innerWidth <= 960) setAlbumsToShow(4)
      else setAlbumsToShow(6)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const endIndex = startIndex + albumsToShow
  const isPrevButtonVisible = startIndex > 0
  const isNextButtonVisible = endIndex < albums.length

  return (
    <div className='lg:w-[500px] h-[80px] mb-6 flex items-center justify-center'>
      {isPrevButtonVisible ? (
        <button
          onClick={showPrevAlbums}
          className='w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center ml-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
          <FaChevronLeft className='w-6 h-6' />
        </button>
      ) : null}
      {albums.slice(startIndex, endIndex).map(album => (
        <div
          key={album.id}
          className='flex-shrink-0 w-[77px] h-[77px] mx-2 border-2 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'>
          {album.id}
        </div>
      ))}
      {isNextButtonVisible ? (
        <button
          onClick={showNextAlbums}
          className='w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center ml-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
          <FaChevronRight className='w-6 h-6' />
        </button>
      ) : null}
    </div>
  )
}

export default UserAlbums
