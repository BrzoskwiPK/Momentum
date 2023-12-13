import { FC, useCallback, useEffect, useState } from 'react'
import { Album, Photo, User } from '../../types/types'
import UserCard from '../UserCard'
import PhotosCard from '../PhotosCard'
import AlbumsCard from '../AlbumsCard'
import { getFilteredResults } from '../../utils/helpers'
import { useAlbums } from '../../hooks/useAlbums'
import { useUsers } from '../../hooks/useUsers'
import { usePhotos } from '../../hooks/usePhotos'

const SearchForm: FC = () => {
  const { users } = useUsers()
  const { photos } = usePhotos()
  const { albums } = useAlbums()
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('users')
  const [searchResults, setSearchResults] = useState<(User | Photo | Album)[]>([])

  useEffect(() => {
    if (users && photos && albums) {
      console.log(photos)
      setSearchResults(getFilteredResults(searchPhrase, selectedTab, users, photos, albums))
    }
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
      <div className='flex flex-col sm:flex-row my-4'>
        <button
          className={`sm:mr-2 px-4 py-2 ${
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
          className={`sm:ml-2 px-4 py-2 ${
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
