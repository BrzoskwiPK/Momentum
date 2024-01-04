import { useEffect, useState } from 'react'
import { User, Comment, CommentWithPublisher } from '../types/types'
import { useAuthenticatedUser } from './useAuthenticatedUser'
import { useQueryClient } from '@tanstack/react-query'
import { fetchCommentsByPostId } from '../api/comments'
import { fetchAllUsers } from '../api/users'

interface UsePostCommentsProps {
  postId: number
}

export const usePostComments = ({ postId }: UsePostCommentsProps) => {
  const queryClient = useQueryClient()
  const [comments, setComments] = useState<CommentWithPublisher[]>()
  const [users, setUsers] = useState<User[]>()
  const { userContext } = useAuthenticatedUser()

  const fetchComments = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`comments-${postId}`],
      queryFn: () => fetchCommentsByPostId(postId),
      staleTime: 600000,
    })

    if (data.length > 0) {
      const commentsWithPublisher: CommentWithPublisher[] = data.map((comment, index) => ({
        ...comment,
        publisherId: index + 1 >= 4 ? ((index + 1) % 3) + 1 : index + 1,
        publishDate: index + 1,
      }))

      setComments(commentsWithPublisher)
    } else {
      setComments([])
    }
  }

  const fetchUsers = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
      staleTime: 600000,
    })

    if (data.length > 0) setUsers(data)
  }

  const deleteComment = async (commentId: number) => {
    const prevComments = queryClient.getQueryData<Comment[]>([`comments-${postId}`]) || []
    const filteredComments = prevComments.filter(comment => comment.id !== commentId) || []

    await queryClient.setQueryData([`comments-${postId}`], filteredComments)
    await queryClient.invalidateQueries({ queryKey: [`comments-${postId}`] })

    fetchComments()
  }

  const publishComment = async (commentText: string) => {
    const newComment: CommentWithPublisher = {
      postId: postId,
      id: Math.ceil(Math.random() * 500 + 200),
      name: 'Pellentesque habitant morbi tristique senectus',
      email: userContext?.email || 'anonymous@example.com',
      body: commentText,
      publisherId: userContext?.id || Math.ceil(Math.random() * 4),
      publishDate: 0.1,
    }

    const prevComments = queryClient.getQueryData<Comment[]>([`comments-${postId}`]) || []

    await queryClient.setQueryData([`comments-${postId}`], [...prevComments, newComment])

    await queryClient.invalidateQueries({ queryKey: [`comments-${postId}`] })

    fetchComments()
  }

  useEffect(() => {
    fetchComments()
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  return { comments, users, deleteComment, publishComment }
}
