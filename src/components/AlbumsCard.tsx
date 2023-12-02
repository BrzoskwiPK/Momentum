import { FC, useEffect, useState } from 'react'
import { Album, Photo } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchPhotosByAlbumId } from '../api/photos'
import PhotosCard from './PhotosCard'

interface AlbumCardProps {
  album: Album
}

const AlbumsCard: FC<AlbumCardProps> = ({ album }: AlbumCardProps) => {
  const queryClient = useQueryClient()
  const [photos, setPhotos] = useState<Photo[]>()

  useEffect(() => {
    fetchAlbumsPhotos()
  })

  const fetchAlbumsPhotos = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`albumsPhotos-${album.id}`],
      queryFn: () => fetchPhotosByAlbumId(album.id),
    })

    if (data.length > 0) setPhotos(data)
  }

  return (
    <div className='w-full flex flex-col justify-center'>
      <p className='ml-4'>
        <strong>Album:</strong> {album.title}
      </p>
      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {photos
          ? photos.map(p => (
              <div key={p.id} className='my-5'>
                <PhotosCard photo={p} />
              </div>
            ))
          : 'Loading...'}
      </div>
    </div>
  )
}

export default AlbumsCard
