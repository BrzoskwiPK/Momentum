import { FC } from 'react'
import { User } from '../types/types'

interface UserContactDetailsProps {
  user: User
}

const UserContactDetails: FC<UserContactDetailsProps> = ({ user }) => (
  <div>
    {user?.website || user?.phone ? (
      <>
        <strong>Contact:</strong> {user.website} or {user.phone}
      </>
    ) : null}
  </div>
)

export default UserContactDetails
