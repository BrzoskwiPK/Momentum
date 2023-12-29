import { Post } from '../types/types'
import { useData } from './useData'
import { createPost, deletePost as deletePostFn, fetchAllPosts } from '../api/posts'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const usePosts = () => {
  const { data: posts, fetchData } = useData<Post>({ queryKey: ['posts'], fetchFn: fetchAllPosts })

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

  return { posts, fetchData, deletePost, addPost }
}
