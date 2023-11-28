import { FC } from 'react'

interface UserProfileImageProps {
  userId: number
}

const UserProfileImage: FC<UserProfileImageProps> = ({ userId }: UserProfileImageProps) => (
  <div className='flex-shrink-0 md:mb-0'>
    <img
      src={`./assets/profile-${userId}.jpg`}
      alt=''
      className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover rounded-full bg-gray-500 border-2 border-black'
    />
  </div>
)

export default UserProfileImage
