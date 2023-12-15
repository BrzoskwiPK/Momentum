import { FC } from 'react'
import { User } from '../types/types'
import UserContactInfo from './UserContactInfo'
import UserContactDetails from './UserContactDetails'
import UserLocationInfo from './UserLocationInfo'
import UserCompanyInfo from './UserCompanyInfo'

interface UserAdditionalInfoProps {
  user: User
}

const UserAdditionalInfo: FC<UserAdditionalInfoProps> = ({ user }: UserAdditionalInfoProps) => {
  return (
    <div className='flex justify-center flex-col'>
      <UserContactInfo user={user} />
      <UserContactDetails user={user} />
      <UserLocationInfo user={user} />
      <UserCompanyInfo user={user} />
    </div>
  )
}

export default UserAdditionalInfo
