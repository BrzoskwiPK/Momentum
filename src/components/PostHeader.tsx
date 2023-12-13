import { FC } from 'react'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { User } from '../types/types'
import CircleIcon from './CircleIcon'

interface PostHeaderProps {
  user: User
  deletePost: () => void
}

const PostHeader: FC<PostHeaderProps> = ({ user, deletePost }: PostHeaderProps) => {
  const { userContext } = useAuthenticatedUser()

  return (
    <div className='relative flex px-4'>
      <CircleIcon size={42} imageUrl={`./assets/profile-${user.id}.jpg`} />
      <div>
        <p className='font-bold'>{user.name}</p>
        <p className='text-sm'>{Math.floor(Math.random() * 10) + 1} hours ago</p>
      </div>
      <div>
        {userContext?.id === user.id && (
          <button
            className='bg-red-500 w-[80px] ml-4 rounded-sm text-white py-1 hover:bg-red-400'
            onClick={deletePost}>
            DELETE
          </button>
        )}
      </div>
    </div>
  )
}

export default PostHeader
