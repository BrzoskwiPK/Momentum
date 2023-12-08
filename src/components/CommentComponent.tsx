import { FC, useContext } from 'react'
import CircleIcon from './CircleIcon'
import { User } from '../types/types'
import UserContext from '../contexts/user-context'

interface CommentProps {
  id: number
  name: string
  publisher: User
  content: string
  deleteComment: (index: number) => void
}

const CommentComponent: FC<CommentProps> = ({
  id,
  name,
  publisher,
  content,
  deleteComment,
}: CommentProps) => {
  const userContext = useContext(UserContext)
  const authenticatedUser = userContext?.user
  return (
    <div>
      <div className='flex my-2 px-4'>
        {authenticatedUser?.id === publisher.id ? (
          <button
            className='absolute top-1 right-2 bg-red-500 w-[80px] rounded-sm text-white py-1 hover:bg-red-400'
            onClick={() => deleteComment(id)}>
            DELETE
          </button>
        ) : null}
        <CircleIcon size={38} imageUrl={`./assets/profile-${publisher.id}.jpg`} />
        <div>
          <p className='font-bold'>{publisher.name}</p>
          <p className='text-sm'>{Math.floor(Math.random() * 10) + 1} hours ago</p>
        </div>
      </div>
      <div className='px-[60px] mt-2'>
        <p className='font-semibold mb-1'>{name}</p>
        <div className=''>{content}</div>
      </div>
    </div>
  )
}

export default CommentComponent
