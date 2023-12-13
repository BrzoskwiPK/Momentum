import { useState } from 'react'
import { Post, User } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchPostById } from '../api/posts'
import { fetchAllUsers } from '../api/users'

interface UsePostProps {
  postId: number
}

export const usePost = ({ postId }: UsePostProps) => {
  const queryClient = useQueryClient()
  const [post, setPost] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>()

  const fetchPost = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`post-${postId}`],
      queryFn: () => fetchPostById(postId),
    })

    setPost(data)
  }

  const fetchUsers = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
    })

    if (data.length > 0) setUsers(data)
  }

  return { post, users, fetchPost, fetchUsers }
}
