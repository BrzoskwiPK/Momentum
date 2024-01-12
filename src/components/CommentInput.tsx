import { FC, useState } from 'react'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import CircleIcon from './CircleIcon'

interface CommentInputProps {
  onPublishComment: (commentText: string) => void
}

const CommentInput: FC<CommentInputProps> = ({ onPublishComment }: CommentInputProps) => {
  const { userContext } = useAuthenticatedUser()
  const [commentText, setCommentText] = useState('')

  const handleClick = () => {
    onPublishComment(commentText)
    setCommentText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commentText.length > 0) {
      onPublishComment(commentText)
      setCommentText('')
    }
  }

  return (
    <div className='border-t-2 mt-2 pt-4 border-gray-500 px-4 flex'>
      <CircleIcon size={42} imageUrl={`./assets/profile-${userContext?.id}.jpg`} />
      <input
        name='inputComment'
        type='text'
        className='text md:w-[40%] w-[60%]'
        placeholder='write a comment...'
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <button
        className={`${
          commentText.length === 0 ? 'bg-indigo-100 pointer-events-none' : 'bg-indigo-600'
        } ml-3 rounded-sm px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={handleClick}
        tabIndex={commentText.length === 0 ? -1 : 0}>
        PUBLISH
      </button>
    </div>
  )
}

export default CommentInput
