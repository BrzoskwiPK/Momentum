import { FC } from 'react'
import { Album } from '../types/types'

interface AlbumComponentProps {
  album: Album
  onAlbumClick: () => void
}

const AlbumComponent: FC<AlbumComponentProps> = ({ album, onAlbumClick }: AlbumComponentProps) => (
  <div
    key={album.id}
    className='flex-shrink-0 w-[77px] h-[77px] mx-2 border-2 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
    onClick={onAlbumClick}>
    {album.id}
  </div>
)

export default AlbumComponent
