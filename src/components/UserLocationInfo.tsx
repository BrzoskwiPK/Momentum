import { FC } from 'react'
import { User } from '../types/types'

interface UserLocationInfoProps {
  user: User
}

const UserLocationInfo: FC<UserLocationInfoProps> = ({ user }) => (
  <div>
    {user?.address ? (
      <>
        <strong>From:</strong> {user.address.street}, {user.address.suite}, {user.address.city},{' '}
        {user.address.zipcode}
      </>
    ) : null}
  </div>
)

export default UserLocationInfo
