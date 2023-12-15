import { FC } from 'react'
import { User } from '../types/types'

interface UserContactInfoProps {
  user: User
}

const UserContactInfo: FC<UserContactInfoProps> = ({ user }) => (
  <div className='flex'>
    {user?.name && <strong className='font-semibold'>{user.name}</strong>}
    {user?.email && <span className='ml-2'> [{user.email}]</span>}
  </div>
)

export default UserContactInfo
