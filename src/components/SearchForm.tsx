import { FC, useCallback, useEffect, useState } from 'react'
import { fetchAllUsers } from '../api/users'
import { useQueryClient } from '@tanstack/react-query'
import { Album, Photo, User } from '../types/types'
import { fetchAllPhotos } from '../api/photos'
import UserCard from './UserCard'
import PhotosCard from './PhotosCard'
import { fetchAllAlbums } from '../api/albums'
import AlbumsCard from './AlbumsCard'

const getFilteredResults = (
  searchPhrase: string,
  selectedTab: string,
  users: User[],
  photos: Photo[],
  albums: Album[]
): (User | Photo | Album)[] => {
  if (searchPhrase.length === 0) return []

  const searchLowerCase = searchPhrase.toLowerCase()

  if (selectedTab === 'photos') {
    return photos.filter(p => p.id.toString().startsWith(searchLowerCase))
  } else if (selectedTab === 'users') {
    return users.filter(u => u.name.toLowerCase().startsWith(searchLowerCase))
  } else if (selectedTab === 'albums') {
    return albums.filter(a => a.id.toString().startsWith(searchLowerCase))
  }

  return []
}

const fetchData = async (
  queryClient: any,
  queryKey: string[],
  fetchFn: () => Promise<any>,
  setData: (data: any) => void
) => {
  const data = await queryClient.ensureQueryData({ queryKey, queryFn: fetchFn })
  if (data) setData(data)
}

const SearchForm: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('users')
  const [searchResults, setSearchResults] = useState<(User | Photo | Album)[]>([])

  const queryClient = useQueryClient()

  useEffect(() => {
    fetchData(queryClient, ['users'], fetchAllUsers, setUsers)
    fetchData(queryClient, ['photos'], fetchAllPhotos, setPhotos)
    fetchData(queryClient, ['albums'], fetchAllAlbums, setAlbums)
  }, [])

  useEffect(() => {
    setSearchResults(getFilteredResults(searchPhrase, selectedTab, users, photos, albums))
  }, [searchPhrase, selectedTab, users, photos, albums])

  const handleChangeSelectedTab = useCallback(
    (tab: string) => {
      setSearchPhrase('')
      setSelectedTab(tab)
    },
    [setSearchPhrase, setSelectedTab]
  )

  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='flex mb-4'>
        <button
          className={`mr-2 px-4 py-2 ${
            selectedTab === 'users' ? 'bg-black text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleChangeSelectedTab('users')}>
          Find User
        </button>
        <button
          className={`px-4 py-2 ${
            selectedTab === 'photos' ? 'bg-black text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleChangeSelectedTab('photos')}>
          Find Photo
        </button>
        <button
          className={`ml-2 px-4 py-2 ${
            selectedTab === 'albums' ? 'bg-black text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleChangeSelectedTab('albums')}>
          Find Album
        </button>
      </div>
      <input
        type='text'
        name='search-input'
        placeholder='Search'
        value={searchPhrase}
        onChange={e => setSearchPhrase(e.target.value)}
      />
      <div className='my-4 h-[80vh] w-full flex flex-wrap justify-center gap-2'>
        {searchResults.map(result =>
          selectedTab === 'users' ? (
            <UserCard key={result.id} user={result as User} />
          ) : selectedTab === 'photos' ? (
            <PhotosCard key={result.id} photo={result as Photo} />
          ) : (
            <AlbumsCard key={result.id} album={result as Album} />
          )
        )}
      </div>
    </div>
  )
}

export default SearchForm
