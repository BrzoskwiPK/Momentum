import { FC } from 'react'
import { User } from '../types/types'
import UserProfileImage from './UserProfileImage'
import UserProfileDetails from './UserProfileDetails'

interface UserProfileInfoProps {
  user: User
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({ user }: UserProfileInfoProps) => {
  return (
    <div className='w-full h-[200px] sm:mb-4 md:mb-0 flex flex-col md:flex-row items-center justify-center'>
      <UserProfileImage userId={user.id} />
      <UserProfileDetails user={user} />
    </div>
  )
}

export default UserProfileInfo
