import { FC } from 'react'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { User } from '../types/types'
import Avatar from './Avatar'
import PostCreatorInfo from './PostCreatorInfo'

interface PostHeaderProps {
  user: User
  deletePost: () => void
}

const PostHeader: FC<PostHeaderProps> = ({ user, deletePost }: PostHeaderProps) => {
  const { userContext } = useAuthenticatedUser()

  return (
    <div className='relative flex px-4'>
      <Avatar user={user} />
      <PostCreatorInfo user={user} />
      {user && userContext ? (
        <div>
          {userContext?.id === user.id && (
            <button
              className='bg-red-500 w-[80px] ml-4 rounded-sm text-white py-1 hover:bg-red-400'
              onClick={deletePost}>
              DELETE
            </button>
          )}
        </div>
      ) : (
        <p>Loading autor...</p>
      )}
    </div>
  )
}

export default PostHeader
