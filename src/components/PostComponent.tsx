import { FC } from 'react'

interface PostComponentProps {
  id: number
  title: string
  body: string
}

const Post: FC<PostComponentProps> = ({ id, title, body }: PostComponentProps) => {
  return (
    <li key={id} className='mb-4 h-auto post'>
      <div className='bg-white p-4 border rounded-md h-full'>
        <h3 className='text-xl font-semibold mb-2'>{title}</h3>
        <p>{body}</p>
      </div>
    </li>
  )
}

export default Post
