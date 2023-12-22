import { FC, useEffect, useState } from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import { useUserAlbums } from '../hooks/useUserAlbums'
import { useUserTodos } from '../hooks/useUserTodos'
import { useUserPosts } from '../hooks/useUserPosts'
import UserProfileInfo from './UserProfileInfo'
import UserAlbums from './UserAlbums'
import UserTabs from './UserTabs'
import UserPosts from './UserPosts'
import UserTodos from './UserTodos'
import AlbumGallery from './AlbumGallery'

const OwnProfile: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'posts' | 'todos'>('posts')
  const [shouldRenderGallery, setShouldRenderGallery] = useState<boolean>(false)
  const [currentAlbum, setCurrentAlbum] = useState<number>()
  const userInfo = localStorage.getItem('userInfo')

  const { user } = useUserProfile({ profileId: JSON.parse(userInfo!).id })
  const { albums, findUserAlbums } = useUserAlbums({ profileId: JSON.parse(userInfo!).id })
  const { posts, findUserPosts } = useUserPosts({ profileId: JSON.parse(userInfo!).id })
  const { todos, findUserTodos } = useUserTodos({ profileId: JSON.parse(userInfo!).id })

  useEffect(() => {
    findUserAlbums()
    findUserPosts()
    findUserTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const handleTabChange = (tab: 'posts' | 'todos') => {
    setSelectedTab(tab)
  }

  return (
    <section className='w-full min-h-full flex flex-col justify-start items-center'>
      {user ? <UserProfileInfo user={user} /> : <p>Loading user details...</p>}
      {albums ? (
        <UserAlbums
          setShouldRenderGallery={setShouldRenderGallery}
          setCurrentAlbum={setCurrentAlbum}
          albums={albums}
        />
      ) : (
        <p className='pb-4'>Loading albums...</p>
      )}
      <UserTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
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

export default OwnProfile
