import { FC } from 'react'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { User } from '../types/types'
import Avatar from './Avatar'
import PostCreatorInfo from './PostCreatorInfo'
import { MdDelete } from 'react-icons/md'

interface PostHeaderProps {
  user: User
  postId: number
  deletePost: (id: number) => void
}

const PostHeader: FC<PostHeaderProps> = ({ user, postId, deletePost }: PostHeaderProps) => {
  const { userContext } = useAuthenticatedUser()

  return (
    <div className='relative flex px-4'>
      <Avatar user={user} />
      <PostCreatorInfo user={user} />
      {user && userContext ? (
        <div>
          {userContext?.id === user.id && (
            <MdDelete
              onClick={() => deletePost(postId)}
              tabIndex={0}
              className='w-8 h-8 mx-4 text-red-500 rounded-sm py-1 hover:text-red-600 hover:cursor-pointer absolute top-0 right-0'
            />
          )}
        </div>
      ) : (
        <p className='ml-2'>Loading autor...</p>
      )}
    </div>
  )
}

export default PostHeader
