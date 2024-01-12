import { FC } from 'react'
import CircleIcon from './CircleIcon'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { MdDelete } from 'react-icons/md'

interface CommentComponentProps {
  id: number
  name: string
  publisherEmail: string
  publisherId: number
  content: string
  publishDate: number
  addBottomBorder: boolean
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
  addBottomBorder,
}: CommentComponentProps) => {
  const { userContext } = useAuthenticatedUser()
  const isUserCommentOwner = userContext?.email === publisherEmail

  const imageUrl = isUserCommentOwner
    ? `./assets/profile-${userContext?.id}.jpg`
    : `./assets/publisher-${publisherId}.jpg`

  return (
    <div className={`${addBottomBorder ? 'border-b-4 py-2' : 'pt-2'}`}>
      <div className='flex my-2 px-4 pb-1 relative'>
        <CircleIcon size={38} imageUrl={imageUrl} />
        <div>
          <p className='font-bold max-[400px]:text-xs'>
            {isUserCommentOwner
              ? userContext?.name
              : publisherEmail.slice(0, publisherEmail.indexOf('@')).replace(/_|\./, ' ')}
          </p>
          <p className='text-sm'>{publishDate} hours ago</p>
        </div>
        {isUserCommentOwner ? (
          <MdDelete
            onClick={() => deleteComment(id)}
            tabIndex={0}
            className='w-8 h-8 mx-4 text-red-500 rounded-sm py-1 hover:text-red-600 hover:cursor-pointer absolute top-0 right-0'
          />
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
