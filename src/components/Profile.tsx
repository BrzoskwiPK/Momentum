import { FC, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/user-context'
import { Album, Post, Todo, User, UserAccount } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchAllUsers, fetchUserAlbums, fetchUserTodos } from '../api/users'
import UserAlbums from './UserAlbums'
import UserProfileInfo from './UserProfileInfo'
import { fetchUserPosts } from '../api/posts'
import UserPosts from './UserPosts'
import UserTodos from './UserTodos'

const Profile: FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [selectedTab, setSelectedTab] = useState<'posts' | 'todos'>('posts')

  const userContext = useContext(UserContext)
  const userCredentials: UserAccount = userContext?.user!
  const queryClient = useQueryClient()

  const handleTabChange = (tab: 'posts' | 'todos') => {
    setSelectedTab(tab)
  }

  const findUserAlbums = async () => {
    if (user) {
      const data = await queryClient.ensureQueryData({
        queryKey: ['userAlbums'],
        queryFn: () => fetchUserAlbums(user.id),
      })

      if (data.length > 0) setAlbums(data)
    }
  }

  const findUserPosts = async () => {
    if (user) {
      const data = await queryClient.ensureQueryData({
        queryKey: ['userPosts'],
        queryFn: () => fetchUserPosts(user.id),
      })

      if (data.length > 0) setPosts(data)
    }
  }

  const findUserTodos = async () => {
    if (user) {
      const data = await queryClient.ensureQueryData({
        queryKey: ['userTodos'],
        queryFn: () => fetchUserTodos(user.id),
      })

      if (data.length > 0) setTodos(data)
    }
  }

  const findUserInfo = async () => {
    const data = await queryClient.ensureQueryData({ queryKey: ['users'], queryFn: fetchAllUsers })

    const userInfo = data.find(u => u.username === userCredentials?.username)

    if (userInfo) setUser(userInfo)
  }

  useEffect(() => {
    findUserInfo()
    findUserAlbums()
    findUserPosts()
    findUserTodos()
  })

  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      {user ? <UserProfileInfo user={user} /> : null}
      <UserAlbums albums={albums || []} />
      <div className='flex mb-4'>
        <button
          className={`mr-2 px-4 py-2 ${
            selectedTab === 'posts' ? 'bg-black text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('posts')}>
          User Posts
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === 'todos' ? 'bg-black text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabChange('todos')}>
          User Todos
        </button>
      </div>
      {selectedTab === 'posts' ? (
        <UserPosts posts={posts || []} />
      ) : (
        <UserTodos todos={todos || []} />
      )}
    </section>
  )
}

export default Profile
