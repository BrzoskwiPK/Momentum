import { FC, useEffect, useState } from 'react'
import { Album, Post, Todo, User } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchAllUsers, fetchUserAlbums, fetchUserTodos } from '../api/users'
import UserAlbums from './UserAlbums'
import UserProfileInfo from './UserProfileInfo'
import { fetchUserPosts } from '../api/posts'
import UserPosts from './UserPosts'
import UserTodos from './UserTodos'
import AlbumGallery from './AlbumGallery'
import { useParams } from 'react-router-dom'

const Profile: FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [selectedTab, setSelectedTab] = useState<'posts' | 'todos'>('posts')
  const [shouldRenderGallery, setShouldRenderGallery] = useState<boolean>(false)
  const [currentAlbum, setCurrentAlbum] = useState<number>()
  const { profileId } = useParams()

  const queryClient = useQueryClient()

  const handleTabChange = (tab: 'posts' | 'todos') => {
    setSelectedTab(tab)
  }

  const findUserAlbums = async () => {
    if (user) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userAlbums-${profileId}`],
        queryFn: () => fetchUserAlbums(Number(profileId)),
      })

      if (data.length > 0) setAlbums(data)
    }
  }

  const findUserPosts = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userPosts-${profileId}`],
        queryFn: () => fetchUserPosts(Number(profileId)),
      })

      if (data.length > 0) setPosts(data)
    }
  }

  const findUserTodos = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userTodos-${profileId}`],
        queryFn: () => fetchUserTodos(Number(profileId)),
      })

      if (data.length > 0) setTodos(data)
    }
  }

  const findUserInfo = async () => {
    const data = await queryClient.ensureQueryData({ queryKey: ['users'], queryFn: fetchAllUsers })

    const userInfo = data.find(u => u.id === Number(profileId))

    if (userInfo) setUser(userInfo)
  }

  useEffect(() => {
    findUserInfo()
    findUserAlbums()
    findUserPosts()
    findUserTodos()
  }, [])

  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      {user ? <UserProfileInfo user={user} /> : null}
      {albums ? (
        <UserAlbums
          setShouldRenderGallery={setShouldRenderGallery}
          setCurrentAlbum={setCurrentAlbum}
          albums={albums}
        />
      ) : null}
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
      {shouldRenderGallery ? (
        <AlbumGallery
          setShouldRenderGallery={setShouldRenderGallery}
          currentAlbum={currentAlbum!}
        />
      ) : null}
    </section>
  )
}

export default Profile
