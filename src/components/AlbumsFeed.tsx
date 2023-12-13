import { FC } from 'react'
import { usePhotosByAlbumId } from '../hooks/usePhotosByAlbumId'
import { Album } from '../types/types'
import PhotosCard from './PhotosCard'

interface AlbumsFeedProps {
  album: Album
}

const AlbumsFeed: FC<AlbumsFeedProps> = ({ album }: AlbumsFeedProps) => {
  const { photos } = usePhotosByAlbumId(album.id)

  return (
    <div className='flex w-full flex-wrap'>
      {photos?.map(photo => (
        <PhotosCard key={photo.id} photo={photo} />
      ))}
    </div>
  )
}

export default AlbumsFeed
