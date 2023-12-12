import { FC, useEffect, useState } from 'react'
import { User, Comment } from '../types/types'
import CircleIcon from './CircleIcon'
import { useQueryClient } from '@tanstack/react-query'
import { fetchCommentsByPostId } from '../api/comments'
import { fetchAllUsers } from '../api/users'
import CommentList from './CommentList'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface PostComponentProps {
  user: User
  id: number
  title: string
  body: string
  deletePost: (index: number) => void
}

const PostComponent: FC<PostComponentProps> = ({
  user,
  id,
  title,
  body,
  deletePost,
}: PostComponentProps) => {
  const [comments, setComments] = useState<Comment[]>()
  const [commentText, setCommmentText] = useState<string>('')
  const [users, setUsers] = useState<User[]>()
  const { userContext } = useAuthenticatedUser()
  const queryClient = useQueryClient()

  const fetchComments = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: [`comments-${id}`],
      queryFn: () => fetchCommentsByPostId(id),
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

  const deleteComment = (i: number) => {
    setComments(prev => prev?.filter(comment => comment.id !== i))
  }

  const publishComment = () => {
    const newComment: Comment = {
      postId: id,
      id: Math.floor(Math.random() * 10000) + 1,
      name: userContext?.name || 'Anonymous',
      email: userContext?.email || 'anonymous@example.com',
      body: commentText,
    }

    setComments(prev => [...(prev ?? []), newComment])
    setCommmentText('')
  }

  useEffect(() => {
    fetchComments()
    fetchUsers()
  }, [])

  return (
    <div key={id} className='w-[80%] my-2 border-2 border-black border-solid py-4'>
      <div className='relative flex px-4'>
        <CircleIcon size={42} imageUrl={`./assets/profile-${user.id}.jpg`} />
        <div>
          <p className='font-bold'>{user.name}</p>
          <p className='text-sm'>{Math.floor(Math.random() * 10) + 1} hours ago</p>
        </div>
        <div>
          {userContext?.id === user.id ? (
            <button
              className='bg-red-500 w-[80px] ml-4 rounded-sm text-white py-1 hover:bg-red-400'
              onClick={() => deletePost(id)}>
              DELETE
            </button>
          ) : null}
        </div>
      </div>
      <div className='w-full px-4 mt-2 pb-4 border-b-2 border-gray-500'>
        <p className='font-semibold mb-1'>{title}</p>
        <div className=''>{body}</div>
      </div>
      <CommentList
        comments={comments || []}
        users={users || []}
        deleteComment={deleteComment}
        authenticatedUser={user}
      />
      <div className='border-t-2 mt-2 pt-4 border-gray-500 px-4 flex'>
        <CircleIcon size={42} imageUrl={`./assets/profile-${userContext?.id}.jpg`} />
        <input
          type='text'
          className='text'
          placeholder='write a comment...'
          value={commentText}
          onChange={e => setCommmentText(e.target.value)}
        />
        <button
          className='ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={publishComment}>
          Publish
        </button>
      </div>
    </div>
  )
}

export default PostComponent
