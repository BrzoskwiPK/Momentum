import { FC } from 'react'
import { User } from '../types/types'
import UserAdditionalInfo from './UserAdditionalInfo'
import UserPrimaryInfo from './UserPrimaryInfo'

interface UserProfileDetailsProps {
  user: User
}

const UserProfileDetails: FC<UserProfileDetailsProps> = ({ user }: UserProfileDetailsProps) => (
  <div className='h-[60px] mb-4 md:h-full xl:w-[600px] lg:w-[400px] md:w-[400px] md:ml-10 flex flex-shrink-0 flex-col justify-center'>
    <UserPrimaryInfo username={user.username} />
    <div className='md:flex justify-center flex-col hidden'>
      <UserAdditionalInfo user={user} />
    </div>
  </div>
)

export default UserProfileDetails
