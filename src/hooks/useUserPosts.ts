import { useEffect, useState } from 'react'
import { fetchUserPosts } from '../api/posts'
import { useQueryClient } from '@tanstack/react-query'
import { Post } from '../types/types'

interface UseUserPostsProps {
  profileId?: string | number | null
}

export const useUserPosts = ({ profileId = '' }: UseUserPostsProps) => {
  const queryClient = useQueryClient()
  const [posts, setPosts] = useState<Post[] | null>(null)

  const findUserPosts = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userPosts-${profileId}`],
        queryFn: () => fetchUserPosts(Number(profileId)),
        staleTime: 600000,
      })

      if (data.length > 0) setPosts(data)
    }
  }

  useEffect(() => {
    findUserPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId])

  return { posts, findUserPosts }
}
