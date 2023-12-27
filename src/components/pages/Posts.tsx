import { FC, useCallback, useState } from 'react'
import { usePosts } from '../../hooks/usePosts'
import PageHeader from '../PageHeader'
import PostsGrid from '../PostsGrid'
import AddPostForm from '../forms/AddPostForm'
import { Post } from '../../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { createPost } from '../../api/posts'
import { deletePost as deletePostFn } from '../../api/posts'

const Posts: FC = () => {
  const { posts, fetchData } = usePosts()
  const [showPostForm, setShowPostForm] = useState<boolean>(false)

  const openPostForm = () => {
    setShowPostForm(true)
  }

  const closePhotoForm = () => {
    setShowPostForm(false)
  }

  const queryClient = useQueryClient()

  const deletePost = useCallback(
    async (postId: number) => {
      await queryClient.fetchQuery({
        queryKey: [`deletePost-${postId}`],
        queryFn: () => deletePostFn(postId),
      })

      const prevPosts = queryClient.getQueryData<Post[]>(['posts']) || []

      queryClient.setQueryData(['posts'], [...prevPosts.filter(post => post.id !== postId)])

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      fetchData()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const addPost = async (post: Post) => {
    await queryClient.fetchQuery({
      queryKey: [`publishPost-${post.id}`],
      queryFn: () => createPost(post),
    })

    const prevPosts = queryClient.getQueryData<Post[]>(['posts']) || []

    queryClient.setQueryData(['posts'], [...prevPosts, post])

    queryClient.invalidateQueries({ queryKey: ['posts'] })
    fetchData()
  }

  return (
    <div className='w-full max-h-screen flex flex-col items-center'>
      <PageHeader page='Posts' item='post' onClick={openPostForm} />
      {showPostForm ? (
        <AddPostForm
          onCancel={closePhotoForm}
          setShowPostForm={setShowPostForm}
          addPost={addPost}
        />
      ) : posts ? (
        <PostsGrid posts={posts} deletePost={deletePost} />
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default Posts
