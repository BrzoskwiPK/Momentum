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
      staleTime: 600000,
    })

    if (data.length > 0) setComments(data)
  }

  const fetchUsers = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
      staleTime: 600000,
    })

    if (data.length > 0) setUsers(data)
  }

  const deleteComment = (commentId: number) => {
    const prevComments = queryClient.getQueryData<Comment[]>([`comments-${postId}`]) || []
    const filteredComments = prevComments.filter(comment => comment.id !== commentId) || []

    queryClient.setQueryData([`comments-${postId}`], filteredComments)
    queryClient.invalidateQueries({ queryKey: [`comments-${postId}`] })

    fetchComments()
  }

  const publishComment = (commentText: string) => {
    const newComment: Comment = {
      postId: postId,
      id: Math.ceil(Math.random() * 500 + 200),
      name: 'Pellentesque habitant morbi tristique senectus',
      email: userContext?.email || 'anonymous@example.com',
      body: commentText,
    }

    const prevComments = queryClient.getQueryData<Comment[]>([`comments-${postId}`]) || []

    queryClient.setQueryData([`comments-${postId}`], [...prevComments, newComment])

    queryClient.invalidateQueries({ queryKey: [`comments-${postId}`] })

    fetchComments()
  }

  useEffect(() => {
    fetchComments()
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  return { comments, users, deleteComment, publishComment }
}
