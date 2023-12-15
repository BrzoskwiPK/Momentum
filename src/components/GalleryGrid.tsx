import { FC } from 'react'
import AlbumPhotoViewer from './AlbumPhotoViewer'
import { Album } from '../types/types'

interface GalleryGridProps {
  albums: Album[]
}

const GalleryGrid: FC<GalleryGridProps> = ({ albums }: GalleryGridProps) => {
  return (
    <>
      {albums.map((album: Album) => (
        <div key={album.id} className='w-full flex flex-wrap justify-start'>
          <p className='w-full my-1'>{album.title}</p>
          <AlbumPhotoViewer album={album} />
        </div>
      ))}
    </>
  )
}

export default GalleryGrid
