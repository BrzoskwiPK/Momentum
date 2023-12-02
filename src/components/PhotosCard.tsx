import { FC } from 'react'
import { Photo } from '../types/types'

interface UserCardProps {
  photo: Photo
}

const PhotosCard: FC<UserCardProps> = ({ photo }: UserCardProps) => {
  return (
    <div className='relative h-[200px] w-[200px]'>
      <img src={photo.url} alt='' className='h-full w-full object-cover' />
      <div className='absolute top-0 left-0 text-white z-10 pl-2 pt-1'>
        <p>{photo.title}</p>
      </div>
    </div>
  )
}

export default PhotosCard
