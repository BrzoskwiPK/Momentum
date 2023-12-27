import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Album } from '../types/types'
import { fetchUserAlbums } from '../api/users'

interface UseUserAlbumsProps {
  profileId?: string | number
}

export const useUserAlbums = ({ profileId = '' }: UseUserAlbumsProps) => {
  const queryClient = useQueryClient()
  const [albums, setAlbums] = useState<Album[] | []>([])

  const findUserAlbums = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userAlbums-${profileId}`],
        queryFn: () => fetchUserAlbums(Number(profileId)),
        staleTime: 600000,
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
