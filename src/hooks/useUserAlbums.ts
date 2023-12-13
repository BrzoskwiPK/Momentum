import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Album } from '../types/types'
import { fetchUserAlbums } from '../api/users'

interface UseUserAlbumsProps {
  profileId?: string
}

export const useUserAlbums = ({ profileId = '' }: UseUserAlbumsProps) => {
  const queryClient = useQueryClient()
  const [albums, setAlbums] = useState<Album[] | null>(null)

  const findUserAlbums = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userAlbums-${profileId}`],
        queryFn: () => fetchUserAlbums(Number(profileId)),
      })

      if (data.length > 0) setAlbums(data)
    }
  }

  useEffect(() => {
    findUserAlbums()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId])

  return { albums, findUserAlbums }
}