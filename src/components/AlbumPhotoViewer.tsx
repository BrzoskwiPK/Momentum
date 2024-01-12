import { FC, useCallback } from 'react'
import { usePhotosByAlbumId } from '../hooks/usePhotosByAlbumId'
import { Album, Photo } from '../types/types'
import PhotosCard from './PhotosCard'
import { useQueryClient } from '@tanstack/react-query'

interface AlbumPhotoViewerProps {
  album: Album
}

const AlbumPhotoViewer: FC<AlbumPhotoViewerProps> = ({ album }: AlbumPhotoViewerProps) => {
  const { photos, fetchPhotos } = usePhotosByAlbumId(album.id)
  const userInfo = localStorage.getItem('userInfo')
  const isCurrentUserAlbum = userInfo ? album.userId === JSON.parse(userInfo).id : false
  const queryClient = useQueryClient()

  const deletePhoto = useCallback(
    async (photoId: number) => {
      const prevPhotos = queryClient.getQueryData<Photo[]>([`albumsPhotos-${album.id}`]) || []

      queryClient.setQueryData(
        [`albumsPhotos-${album.id}`],
        [...prevPhotos.filter(photo => photo.id !== photoId)]
      )

      queryClient.invalidateQueries({ queryKey: [`albumsPhotos-${album.id}`] })

      fetchPhotos()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchPhotos]
  )

  return (
    <div className='flex w-full flex-wrap justify-center gap-2'>
      {photos?.map(photo => (
        <PhotosCard
          key={photo.id}
          photo={photo}
          onClick={isCurrentUserAlbum ? deletePhoto : undefined}
          photoIndex={album.id * 10 + photo.id}
        />
      ))}
    </div>
  )
}

export default AlbumPhotoViewer
