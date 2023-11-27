import { FC } from 'react'
import { Post } from '../types/types'

interface UserPostsProps {
  posts: Post[]
}

const UserPosts: FC<UserPostsProps> = ({ posts }: UserPostsProps) => {
  return (
    <div className='w-full h-[500px] flex justify-center'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full mx-10'>
        {posts.map(post => (
          <li key={post.id} className='mb-4 h-auto'>
            <div className='bg-white p-4 border rounded-md h-full'>
              <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPosts
