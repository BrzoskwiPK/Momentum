import { FC } from 'react'
import { Album } from '../types/types'
import PhotosCard from './PhotosCard'
import { usePhotosByAlbumId } from '../hooks/usePhotosByAlbumId'

interface AlbumCardProps {
  album: Album
}

const AlbumsCard: FC<AlbumCardProps> = ({ album }: AlbumCardProps) => {
  const { photos } = usePhotosByAlbumId(album.id)

  return (
    <div className='w-full flex flex-col justify-center'>
      <p className='ml-4'>
        <strong>Album:</strong> {album.title}
      </p>
      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {photos?.map(photo => (
          <PhotosCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  )
}

export default AlbumsCard
