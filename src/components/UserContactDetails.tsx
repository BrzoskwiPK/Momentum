import { FC } from 'react'
import { User } from '../types/types'

interface UserContactDetailsProps {
  user: User
}

const UserContactDetails: FC<UserContactDetailsProps> = ({ user }) => (
  <div>
    {user?.website || user?.phone ? (
      <>
        <strong>Contact:</strong>{' '}
        {
          <a
            className='underline underline-offset-1 text-cyan-600'
            target='_blank'
            href={'http://' + user.website}
            rel='noreferrer'>
            {user.website}
          </a>
        }{' '}
        or{' '}
        {
          <a className='underline underline-offset-1 text-cyan-600' href={`tel:${user.phone}`}>
            {user.phone}
          </a>
        }
      </>
    ) : null}
  </div>
)

export default UserContactDetails
