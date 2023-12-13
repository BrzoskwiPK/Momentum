import { FC } from 'react'
import CommentList from './CommentList'
import { Comment } from '../types/types'

interface PostCommentsProps {
  comments: Comment[]
  deleteComment: (index: number) => void
}

const PostComments: FC<PostCommentsProps> = ({ comments, deleteComment }: PostCommentsProps) => (
  <CommentList comments={comments} deleteComment={deleteComment} />
)

export default PostComments
