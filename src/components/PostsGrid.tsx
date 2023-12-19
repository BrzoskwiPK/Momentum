import { FC, useMemo } from 'react'
import { Post } from '../types/types'
import { shuffleArray } from '../utils/helpers'
import PostComponent from './PostComponent'
import { useUsers } from '../hooks/useUsers'

interface PostsGridProps {
  posts: Post[]
}

const PostsGrid: FC<PostsGridProps> = ({ posts }: PostsGridProps) => {
  const { users } = useUsers()

  const memoizedPosts = useMemo(() => shuffleArray(posts), [posts])

  const deletePost = () => {
    // TBD
  }

  return (
    <>
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
    </>
  )
}

export default PostsGrid