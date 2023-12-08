import { FC, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/user-context'
import { User, Comment } from '../types/types'
import CircleIcon from './CircleIcon'
import { useQueryClient } from '@tanstack/react-query'
import { fetchCommentsByPostId } from '../api/comments'
import CommentComponent from './CommentComponent'
import { fetchAllUsers } from '../api/users'

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
  const [users, setUsers] = useState<User[]>()
  const userContext = useContext(UserContext)
  const authenticatedUser = userContext?.user
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

  useEffect(() => {
    fetchComments()
    fetchUsers()
  }, [])

  return (
    <div key={id} className='w-[60%] my-2 border-2 border-black border-solid py-4'>
      <div className='relative flex px-4'>
        <CircleIcon size={42} imageUrl={`./assets/profile-${user.id}.jpg`} />
        {authenticatedUser?.id === user.id ? (
          <button
            className='absolute top-1 right-2 bg-red-500 w-[80px] rounded-sm text-white py-1 hover:bg-red-400'
            onClick={() => deletePost(id)}>
            DELETE
          </button>
        ) : null}
        <div>
          <p className='font-bold'>{user.name}</p>
          <p className='text-sm'>{Math.floor(Math.random() * 10) + 1} hours ago</p>
        </div>
      </div>
      <div className='w-full px-4 mt-2 border-b-2 border-gray-500'>
        <p className='font-semibold mb-1'>{title}</p>
        <div className=''>{body}</div>
      </div>
      {comments?.map(c => {
        let publisher: User

        do {
          publisher = users![Math.floor(Math.random() * 9 + 1)]
        } while (publisher.id === user.id)

        return (
          <CommentComponent
            id={c.id}
            name={c.name}
            publisher={publisher}
            content={c.body}
            deleteComment={deleteComment}
          />
        )
      })}
      <div className='border-t-2 pt-4 border-gray-500 px-4 flex'>
        <CircleIcon size={42} imageUrl={`./assets/profile-${authenticatedUser?.id}.jpg`} />
        <input type='text' className='text' placeholder='write a comment...' />
      </div>
    </div>
  )
}

export default PostComponent
