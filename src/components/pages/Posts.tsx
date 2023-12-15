import { FC } from 'react'
import PostComponent from '../PostComponent'
import { shuffleArray } from '../../utils/helpers'
import { usePosts } from '../../hooks/usePosts'
import { useUsers } from '../../hooks/useUsers'
import PageHeader from '../PageHeader'
import PostsGrid from '../PostsGrid'

const Posts: FC = () => {
  const { posts } = usePosts()

  const addPost = () => {
    // TBD
  }

  return (
    <div className='w-full max-h-screen flex flex-col items-center'>
      <PageHeader page='Posts' item='post' onClick={addPost} />
      {posts ? <PostsGrid posts={posts} /> : <p>Loading posts...</p>}
    </div>
  )
}

export default Posts
