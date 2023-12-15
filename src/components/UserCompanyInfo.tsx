import { FC } from 'react'
import { User } from '../types/types'

interface UserCompanyInfoProps {
  user: User
}

const UserCompanyInfo: FC<UserCompanyInfoProps> = ({ user }) => (
  <div>
    {user?.company ? (
      <>
        <strong>Company:</strong> {user.company.name} - {user.company.catchPhrase},{' '}
        {user.company.bs}
      </>
    ) : null}
  </div>
)

export default UserCompanyInfo
