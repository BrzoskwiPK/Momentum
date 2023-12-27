import { FC } from 'react'
import CommentInput from './CommentInput'
import PostComments from './PostComments'
import PostContent from './PostContent'
import PostHeader from './PostHeader'
import { User } from '../types/types'
import { usePostComments } from '../hooks/usePostComments'

interface PostComponentProps {
  user: User
  id: number
  title: string
  body: string
  deletePost: (id: number) => void
}

const PostComponent: FC<PostComponentProps> = ({
  user,
  id,
  title,
  body,
  deletePost,
}: PostComponentProps) => {
  const { comments, deleteComment, publishComment } = usePostComments({ postId: id })

  return (
    <div key={id} className='w-[80%] mt-2 mb-6 border-2 border-black border-solid py-4'>
      <PostHeader user={user} deletePost={deletePost} postId={id} />
      <PostContent title={title} body={body} />
      <PostComments comments={comments!} deleteComment={deleteComment} />
      <CommentInput onPublishComment={publishComment} />
    </div>
  )
}

export default PostComponent
