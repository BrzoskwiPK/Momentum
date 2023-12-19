import { FC, useState } from 'react'
import { useAlbums } from '../../hooks/useAlbums'
import PageHeader from '../PageHeader'
import GalleryGrid from '../GalleryGrid'
import AddPhotoForm from '../forms/AddPhotoForm'

const Feed: FC = () => {
  const { albums } = useAlbums()
  const [showPhotoForm, setShowPhotoForm] = useState(false)

  const addPhoto = () => {
    setShowPhotoForm(true)
  }

  const closePhotoForm = () => {
    setShowPhotoForm(false)
  }

  return (
    <section className='w-full flex items-center justify-center flex-col'>
      <PageHeader page='Feed' item='image' onClick={addPhoto} />
      {showPhotoForm ? (
        <AddPhotoForm onCancel={closePhotoForm} setShowPhotoForm={setShowPhotoForm} />
      ) : albums ? (
        <GalleryGrid albums={albums} />
      ) : (
        <p>Loading albums...</p>
      )}
    </section>
  )
}

export default Feed
