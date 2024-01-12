import { FC } from 'react'
import { Album } from '../types/types'

interface AlbumComponentProps {
  album: Album
  onAlbumClick: () => void
}

const AlbumComponent: FC<AlbumComponentProps> = ({ album, onAlbumClick }: AlbumComponentProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      onAlbumClick()
    }
  }
  return (
    <div
      key={album.id}
      className='flex-shrink-0 w-[77px] h-[77px] mx-2 border-2 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
      onClick={onAlbumClick}
      onKeyDown={handleKeyDown}
      tabIndex={album.id}>
      {album.id}
    </div>
  )
}

export default AlbumComponent
