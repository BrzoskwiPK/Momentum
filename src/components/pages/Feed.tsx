import { FC } from 'react'
import { useAlbums } from '../../hooks/useAlbums'
import PageHeader from '../PageHeader'
import GalleryGrid from '../GalleryGrid'

const Feed: FC = () => {
  const { albums } = useAlbums()

  const addImage = () => {
    // TBD
  }

  return (
    <section className='w-full flex items-center justify-center flex-col'>
      <PageHeader page='Feed' item='image' onClick={addImage} />
      {albums ? <GalleryGrid albums={albums} /> : <p>Loading albums...</p>}
    </section>
  )
}

export default Feed
