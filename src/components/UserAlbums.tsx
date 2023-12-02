import { FC, useCallback, useEffect, useMemo, useState } from 'react'
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

  const showNextAlbums = useCallback(() => {
    setStartIndex(prevIndex => prevIndex + 1)
  }, [])

  const showPrevAlbums = useCallback(() => {
    setStartIndex(prevIndex => prevIndex - 1)
  }, [])

  const handleAlbumClick = useCallback(
    (albumId: number) => {
      setShouldRenderGallery(true)
      setCurrentAlbum(albumId)
    },
    [setShouldRenderGallery, setCurrentAlbum]
  )

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 380) setAlbumsToShow(1)
    else if (window.innerWidth <= 640) setAlbumsToShow(2)
    else if (window.innerWidth <= 960) setAlbumsToShow(4)
    else setAlbumsToShow(6)
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const endIndex = startIndex + albumsToShow
  const isPrevButtonVisible = startIndex > 0
  const isNextButtonVisible = endIndex < albums.length

  const visibleAlbums = useMemo(
    () => albums.slice(startIndex, endIndex),
    [albums, startIndex, endIndex]
  )

  return (
    <div className='lg:w-[500px] h-[80px] mb-6 flex items-center justify-center'>
      {isPrevButtonVisible ? (
        <ChevronButton
          onClick={showPrevAlbums}
          className='w-10 h-10 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center ml-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
          <FaChevronLeft className='w-6 h-6' />
        </ChevronButton>
      ) : null}
      {visibleAlbums.map(album => (
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
