import { FC, useEffect, useState } from 'react'
import { Album } from '../types/types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import AlbumComponent from './AlbumComponent'
import ChevronButton from './ChevronButton'

interface UserAlbumsProps {
  albums: Album[]
  setShouldRenderGallery: (shouldRender: boolean) => void
  setCurrentAlbum: (albumId: number) => void
}

const UserAlbums: FC<UserAlbumsProps> = ({
  albums,
  setShouldRenderGallery,
  setCurrentAlbum,
}: UserAlbumsProps) => {
  const [startIndex, setStartIndex] = useState<number>(0)
  const [albumsToShow, setAlbumsToShow] = useState<number>(6)

  const showNextAlbums = () => {
    setStartIndex(prevIndex => prevIndex + 1)
  }

  const showPrevAlbums = () => {
    setStartIndex(prevIndex => prevIndex - 1)
  }

  const handleAlbumClick = (albumId: number) => {
    setShouldRenderGallery(true)
    setCurrentAlbum(albumId)
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
        <ChevronButton
          onClick={showPrevAlbums}
          className='w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center ml-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
          <FaChevronLeft className='w-6 h-6' />
        </ChevronButton>
      ) : null}
      {albums.slice(startIndex, endIndex).map(album => (
        <AlbumComponent
          key={album.id}
          album={album}
          onAlbumClick={() => handleAlbumClick(album.id)}
        />
      ))}
      {isNextButtonVisible ? (
        <ChevronButton
          onClick={showNextAlbums}
          className='w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center ml-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
          <FaChevronRight className='w-6 h-6' />
        </ChevronButton>
      ) : null}
    </div>
  )
}

export default UserAlbums
