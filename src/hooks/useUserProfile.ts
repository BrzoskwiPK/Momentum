import { useEffect, useState } from 'react'
import { User } from '../types/types'
import { fetchAllUsers } from '../api/users'
import { useQueryClient } from '@tanstack/react-query'

interface UseUserProfileProps {
  profileId?: string
}

export const useUserProfile = ({ profileId = '' }: UseUserProfileProps) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<User | null>(null)

  const findUserInfo = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
      staleTime: 600000,
    })

    const userInfo = data.find(u => u.id === Number(profileId))

    if (userInfo) setUser(userInfo)
  }

  useEffect(() => {
    findUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId])

  return { user }
}
