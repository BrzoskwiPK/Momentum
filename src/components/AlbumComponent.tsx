import { FC } from 'react'
import { Album } from '../types/types'

interface AlbumProps {
  album: Album
  onAlbumClick: () => void
}

const AlbumComponent: FC<AlbumProps> = ({ album, onAlbumClick }: AlbumProps) => (
  <div
    key={album.id}
    className='flex-shrink-0 w-[77px] h-[77px] mx-2 border-2 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
    onClick={onAlbumClick}>
    {album.id}
  </div>
)

export default AlbumComponent
