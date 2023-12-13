import { FC } from 'react'
import CircleIcon from './CircleIcon'
import { User } from '../types/types'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface CommentComponentProps {
  id: number
  name: string
  publisher: User
  content: string
  deleteComment: (index: number) => void
}

const CommentComponent: FC<CommentComponentProps> = ({
  id,
  name,
  publisher,
  content,
  deleteComment,
}: CommentComponentProps) => {
  const { userContext } = useAuthenticatedUser()
  const isUserCommentOwner = userContext?.id === publisher.id

  return (
    <div>
      <div className='flex my-2 px-4 pb-1'>
        <CircleIcon size={38} imageUrl={`./assets/profile-${publisher.id}.jpg`} />
        <div>
          <p className='font-bold'>{publisher.name}</p>
          <p className='text-sm'>{Math.ceil(Math.random() * 10 + 1)} hours ago</p>
        </div>
        {isUserCommentOwner ? (
          <button
            className='mx-4 bg-red-500 w-[80px] h-8 rounded-sm text-white py-1 hover:bg-red-400'
            onClick={() => deleteComment(id)}>
            DELETE
          </button>
        ) : null}
      </div>
      <div className='px-[60px] mt-2'>
        <p className='font-semibold mb-1'>{name}</p>
        <div className=''>{content}</div>
      </div>
    </div>
  )
}

export default CommentComponent
