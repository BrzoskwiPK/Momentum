import { FC } from 'react'
import { Post } from '../types/types'
import ProfilePost from './ProfilePost'

interface UserPostsProps {
  posts: Post[]
}

const UserPosts: FC<UserPostsProps> = ({ posts }: UserPostsProps) => {
  return (
    <div className='w-full h-[500px] flex justify-center'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full mx-10'>
        {posts.map(post => (
          <ProfilePost
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        ))}
      </ul>
    </div>
  )
}

export default UserPosts
