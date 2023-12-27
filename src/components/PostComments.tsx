import { FC } from 'react'
import CommentList from './CommentList'
import { CommentWithPublisher } from '../types/types'

interface PostCommentsProps {
  comments: CommentWithPublisher[]
  deleteComment: (index: number) => void
}

const PostComments: FC<PostCommentsProps> = ({ comments, deleteComment }: PostCommentsProps) => (
  <CommentList comments={comments} deleteComment={deleteComment} />
)

export default PostComments
