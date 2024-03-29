import { useEffect, useState } from 'react'
import { Photo } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchPhotosByAlbumId } from '../api/photos'

export const usePhotosByAlbumId = (albumId: number) => {
  const [isLoading] = useState(true)
  const [photos, setPhotos] = useState<Photo[]>()
  const queryClient = useQueryClient()

  useEffect(() => {
    fetchPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumId])

  const fetchPhotos = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`albumsPhotos-${albumId}`],
      queryFn: () => fetchPhotosByAlbumId(albumId),
      staleTime: 600000,
    })

    if (data.length > 0) {
      setPhotos(data)
    } else {
      setPhotos([])
    }
  }

  return { photos, isLoading, fetchPhotos }
}
