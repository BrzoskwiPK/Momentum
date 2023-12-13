import { FC } from 'react'
import AlbumsFeed from '../AlbumsFeed'
import { useAlbums } from '../../hooks/useAlbums'
import { Album } from '../../types/types'

const Feed: FC = () => {
  const { albums } = useAlbums()

  return (
    <section className='w-full h-[500px] flex items-center justify-center flex-col'>
      {albums?.map((album: Album) => (
        <div key={album.id} className='w-full flex flex-wrap gap-2 justify-start'>
          <p className='w-full my-1'>{album.title}</p>
          <AlbumsFeed album={album} />
        </div>
      ))}
    </section>
  )
}

export default Feed
