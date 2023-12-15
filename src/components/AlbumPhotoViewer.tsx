import { FC } from 'react'
import { usePhotosByAlbumId } from '../hooks/usePhotosByAlbumId'
import { Album } from '../types/types'
import PhotosCard from './PhotosCard'

interface AlbumPhotoViewerProps {
  album: Album
}

const AlbumPhotoViewer: FC<AlbumPhotoViewerProps> = ({ album }: AlbumPhotoViewerProps) => {
  const { photos } = usePhotosByAlbumId(album.id)

  return (
    <div className='flex w-full flex-wrap justify-center gap-2'>
      {photos?.map(photo => (
        <PhotosCard key={photo.id} photo={photo} />
      ))}
    </div>
  )
}

export default AlbumPhotoViewer
