import { FC } from 'react'
import { Photo } from '../types/types'
import { MdDelete } from 'react-icons/md'

interface PhotosCardProps {
  photo: Photo
  onClick?: (id: number) => void
}

const PhotosCard: FC<PhotosCardProps> = ({ photo, onClick }: PhotosCardProps) => {
  return (
    <div className='relative h-[200px] w-[200px] my-5'>
      <img src={photo.url} alt='' className='h-full w-full object-cover' />
      <div className='absolute top-0 left-0 text-white z-10 pl-2 pt-1'>
        <p>{photo.title}</p>
      </div>
      {onClick ? (
        <div
          onClick={onClick ? () => onClick(photo.id) : undefined}
          className='absolute w-full bottom-0 text-white hover:cursor-pointer flex justify-end'>
          <MdDelete className='w-6 h-6' />
        </div>
      ) : null}
    </div>
  )
}

export default PhotosCard
