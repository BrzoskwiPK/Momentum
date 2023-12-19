import { FC, useState } from 'react'
import { usePosts } from '../../hooks/usePosts'
import PageHeader from '../PageHeader'
import PostsGrid from '../PostsGrid'
import AddPostForm from '../forms/AddPostForm'

const Posts: FC = () => {
  const { posts } = usePosts()
  const [showPostForm, setShowPostForm] = useState<boolean>(false)

  const openPostForm = () => {
    setShowPostForm(true)
  }

  const closePhotoForm = () => {
    setShowPostForm(false)
  }

  return (
    <div className='w-full max-h-screen flex flex-col items-center'>
      <PageHeader page='Posts' item='post' onClick={openPostForm} />
      {showPostForm ? (
        <AddPostForm onCancel={closePhotoForm} setShowPostForm={setShowPostForm} />
      ) : posts ? (
        <PostsGrid posts={posts} />
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default Posts
