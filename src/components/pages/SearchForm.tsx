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
    <div className='w-full h-full flex items-center justify-center flex-col px-4'>
      <div className='flex flex-col sm:flex-row my-4 mt-10 sm:mt-4'>
        <button
          className={`sm:mr-2 px-4 py-2 rounded-sm border-b-2 ${
            selectedTab === 'users' ? 'border-black' : 'border-gray-400'
          }`}
          onClick={() => handleChangeSelectedTab('users')}>
          Find User
        </button>
        <button
          className={`px-4 py-2 rounded-sm border-b-2 ${
            selectedTab === 'photos' ? 'border-black' : 'border-gray-400'
          }`}
          onClick={() => handleChangeSelectedTab('photos')}>
          Find Photo
        </button>
        <button
          className={`sm:ml-2 px-4 py-2 rounded-sm border-b-2 ${
            selectedTab === 'albums' ? 'border-black' : 'border-gray-400'
          }`}
          onClick={() => handleChangeSelectedTab('albums')}>
          Find Album
        </button>
      </div>
      <input
        type='text'
        name='search-input'
        placeholder='Search'
        className='w-[80%] sm:w-[250px] rounded-sm'
        value={searchPhrase}
        onChange={e => setSearchPhrase(e.target.value)}
      />
      <div className='my-4 h-[80vh] w-full flex flex-wrap justify-center gap-2'>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) =>
            selectedTab === 'users' ? (
              <UserCard key={result.id} user={result as User} />
            ) : selectedTab === 'photos' ? (
              <PhotosCard key={result.id} photo={result as Photo} photoIndex={index + 10} />
            ) : (
              <AlbumsCard key={result.id} album={result as Album} />
            )
          )
        ) : (
          <div className='flex flex-col items-center min-[401px]:justify-center max-[400px]:justify-start'>
            <img
              src='./assets/no-results.png'
              className='w-36 h-36 md:w-64 md:h-64 my-12 max-[400px]:mt-36'
              alt='Magnifier'
            />
            <strong className='text-2xl text-center'>No results found...</strong>
            <p className='mt-4 text-center'>
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchForm
