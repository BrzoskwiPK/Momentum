import { useEffect, useState } from 'react'
import { User, Comment } from '../types/types'
import { useAuthenticatedUser } from './useAuthenticatedUser'
import { useQueryClient } from '@tanstack/react-query'
import { fetchCommentsByPostId } from '../api/comments'
import { fetchAllUsers } from '../api/users'

interface UsePostCommentsProps {
  postId: number
}

export const usePostComments = ({ postId }: UsePostCommentsProps) => {
  const queryClient = useQueryClient()
  const [comments, setComments] = useState<Comment[]>()
  const [users, setUsers] = useState<User[]>()
  const { userContext } = useAuthenticatedUser()

  const fetchComments = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`comments-${postId}`],
      queryFn: () => fetchCommentsByPostId(postId),
    })

    if (data.length > 0) setComments(data)
  }

  const fetchUsers = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
    })

    if (data.length > 0) setUsers(data)
  }

  const deleteComment = (commentId: number) => {
    setComments(prev => prev?.filter(comment => comment.id !== commentId) || [])
  }

  const publishComment = (commentText: string) => {
    const newComment: Comment = {
      postId: postId,
      id: Math.floor(Math.random() * 10000) + 1,
      name: userContext?.name || 'Anonymous',
      email: userContext?.email || 'anonymous@example.com',
      body: commentText,
    }

    setComments(prev => [...(prev ?? []), newComment])
  }

  useEffect(() => {
    fetchComments()
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  return { comments, users, deleteComment, publishComment }
}
