import { FC, useMemo } from 'react'
import { Post } from '../types/types'
import PostComponent from './PostComponent'
import { useUsers } from '../hooks/useUsers'

interface PostsGridProps {
  posts: Post[]
  deletePost: (id: number) => void
}

const PostsGrid: FC<PostsGridProps> = ({ posts, deletePost }: PostsGridProps) => {
  const { users } = useUsers()

  const memoizedPosts = useMemo(() => posts, [posts])

  return (
    <div className='mt-4 flex flex-col items-center'>
      {memoizedPosts ? (
        memoizedPosts.map(post => (
          <PostComponent
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            user={users?.find(user => user.id === post.userId)!}
            deletePost={deletePost}
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default PostsGrid
