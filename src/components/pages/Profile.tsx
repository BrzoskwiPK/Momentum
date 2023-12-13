import { FC, useEffect, useState } from 'react'
import UserAlbums from '../UserAlbums'
import UserProfileInfo from '../UserProfileInfo'
import UserPosts from '../UserPosts'
import UserTodos from '../UserTodos'
import AlbumGallery from '../AlbumGallery'
import { useParams } from 'react-router-dom'
import { useUserAlbums } from '../../hooks/useUserAlbums'
import { useUserPosts } from '../../hooks/useUserPosts'
import { useUserTodos } from '../../hooks/useUserTodos'
import { useUserProfile } from '../../hooks/useUserProfile'

const Profile: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'posts' | 'todos'>('posts')
  const [shouldRenderGallery, setShouldRenderGallery] = useState<boolean>(false)
  const [currentAlbum, setCurrentAlbum] = useState<number>()
  const { profileId } = useParams()
  const { user } = useUserProfile({ profileId })
  const { albums, findUserAlbums } = useUserAlbums({ profileId })
  const { posts, findUserPosts } = useUserPosts({ profileId })
  const { todos, findUserTodos } = useUserTodos({ profileId })

  const handleTabChange = (tab: 'posts' | 'todos') => {
    setSelectedTab(tab)
  }

  useEffect(() => {
    findUserAlbums()
    findUserPosts()
    findUserTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId])

  return (
    <section className='w-full min-h-full flex flex-col justify-start items-center'>
      {user ? <UserProfileInfo user={user} /> : null}
      {albums ? (
        <UserAlbums
          setShouldRenderGallery={setShouldRenderGallery}
          setCurrentAlbum={setCurrentAlbum}
          albums={albums}
        />
      ) : null}
      <div className='flex w-full justify-center px-10 mb-6'>
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
