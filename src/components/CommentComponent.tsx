import { FC } from 'react'
import CircleIcon from './CircleIcon'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface CommentComponentProps {
  id: number
  name: string
  publisherEmail: string
  publisherId: number
  content: string
  publishDate: number
  deleteComment: (index: number) => void
}

const CommentComponent: FC<CommentComponentProps> = ({
  id,
  name,
  publisherEmail,
  publisherId,
  content,
  deleteComment,
  publishDate,
}: CommentComponentProps) => {
  const { userContext } = useAuthenticatedUser()
  const isUserCommentOwner = userContext?.email === publisherEmail

  const imageUrl = isUserCommentOwner
    ? `./assets/profile-${userContext?.id}.jpg`
    : `./assets/publisher-${publisherId}.jpg`

  return (
    <div>
      <div className='flex my-2 px-4 pb-1'>
        <CircleIcon size={38} imageUrl={imageUrl} />
        <div>
          <p className='font-bold max-[400px]:text-xs'>
            {isUserCommentOwner ? userContext?.email : publisherEmail}
          </p>
          <p className='text-sm'>{publishDate} hours ago</p>
        </div>
        {isUserCommentOwner ? (
          <button
            className='mx-4 bg-red-500 w-[75px] h-8 rounded-sm text-white py-1 hover:bg-red-400'
            onClick={() => deleteComment(id)}>
            DELETE
          </button>
        ) : null}
      </div>
      <div className='max-[400px]:px-4 px-[60px] mt-2'>
        <p className='font-semibold mb-1'>{name}</p>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default CommentComponent
