import { FC } from 'react'
import { User } from '../types/types'

interface UserAdditionalInfoProps {
  user: User
}

const UserAdditionalInfo: FC<UserAdditionalInfoProps> = ({ user }: UserAdditionalInfoProps) => (
  <div className='flex justify-center flex-col'>
    <p className='font-semibold hidden sm:block'>
      {user?.name} [{user?.email}]
    </p>
    <p className='hidden sm:block'>
      <strong>Contact:</strong> {user?.website} or {user?.phone}
    </p>
    {user?.address && (
      <p className='hidden xl:block'>
        <strong>From:</strong> {user.address.street}, {user.address.suite}, {user.address.city},{' '}
        {user.address.zipcode}
      </p>
    )}
    {user?.company && (
      <p className='hidden xl:block'>
        <strong>Company:</strong> {user.company.name} - {user.company.catchPhrase},{' '}
        {user.company.bs}
      </p>
    )}
  </div>
)

export default UserAdditionalInfo
