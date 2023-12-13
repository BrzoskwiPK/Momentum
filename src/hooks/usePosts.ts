import { Post } from '../types/types'
import { useData } from './useData'
import { fetchAllPosts } from '../api/posts'

export const usePosts = () => {
  const { data: posts } = useData<Post>({ queryKey: ['posts'], fetchFn: fetchAllPosts })

  return { posts }
}
