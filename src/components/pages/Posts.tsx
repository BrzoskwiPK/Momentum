import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { fetchAllPosts } from '../../api/posts'
import { Post, User } from '../../types/types'
import PostComponent from '../PostComponent'
import { fetchAllUsers } from '../../api/users'

const Posts: FC = () => {
  const [posts, setPosts] = useState<Post[]>()
  const [users, setUsers] = useState<User[]>()
  const queryClient = useQueryClient()

  const fetchPosts = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['posts'],
      queryFn: fetchAllPosts,
    })

    if (data.length > 0) setPosts(data)
  }

  const fetchUsers = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
    })

    if (data.length > 0) setUsers(data)
  }

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [])

  const deletePost = (i: number) => {
    setPosts(prev => prev?.filter(post => post.id !== i))
  }

  return (
    <div className='w-full max-h-screen flex flex-col items-center'>
      {posts?.map(post => (
        <PostComponent
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          user={users?.find(user => user.id === post.userId)!}
          deletePost={deletePost}
        />
      ))}
    </div>
  )
}

export default Posts
