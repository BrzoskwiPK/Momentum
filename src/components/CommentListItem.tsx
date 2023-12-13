import { FC } from 'react'
import { Comment } from '../types/types'

interface CommentListItemProps {
  comment: Comment
  onDeleteComment: () => void
}

const CommentListItem: FC<CommentListItemProps> = ({
  comment,
  onDeleteComment,
}: CommentListItemProps) => (
  <div key={comment.id} className='my-5'>
    {/* Renderowanie komentarza i obsługa usuwania */}
  </div>
)

export default CommentListItem
