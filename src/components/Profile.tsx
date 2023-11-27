import { FC, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/user-context'
import { Album, Post, User, UserAccount } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchAllUsers, fetchUserAlbums } from '../api/users'
import UserAlbums from './UserAlbums'
import UserProfileInfo from './UserProfileInfo'
import { fetchUserPosts } from '../api/posts'
import UserPosts from './UserPosts'

const Profile: FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)

  const userContext = useContext(UserContext)
  const userCredentials: UserAccount = userContext?.user!
  const queryClient = useQueryClient()

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

  const findUserInfo = async () => {
    const data = await queryClient.ensureQueryData({ queryKey: ['users'], queryFn: fetchAllUsers })

    const userInfo = data.find(u => u.username === userCredentials?.username)

    if (userInfo) setUser(userInfo)
  }

  useEffect(() => {
    findUserInfo()
    findUserAlbums()
    findUserPosts()
  })

  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      {user ? <UserProfileInfo user={user} /> : null}
      <UserAlbums albums={albums || []} />
      <UserPosts posts={posts || []} />
    </section>
  )
}

export default Profile
