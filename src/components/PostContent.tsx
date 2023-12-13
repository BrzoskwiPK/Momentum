import { FC } from 'react'

interface PostContentProps {
  title: string
  body: string
}

const PostContent: FC<PostContentProps> = ({ title, body }: PostContentProps) => (
  <div className='w-full px-4 mt-2 pb-4 border-b-2 border-gray-500'>
    <p className='font-semibold mb-1'>{title}</p>
    <div>{body}</div>
  </div>
)

export default PostContent
