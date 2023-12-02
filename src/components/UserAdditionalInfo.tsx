import { FC } from 'react'
import { User } from '../types/types'

interface UserAdditionalInfoProps {
  user: User
}

const UserAdditionalInfo: FC<UserAdditionalInfoProps> = ({ user }: UserAdditionalInfoProps) => {
  const renderBlock = (condition: boolean, content: JSX.Element, className?: string) =>
    condition ? <p className={className}>{content}</p> : null

  return (
    <div className='flex justify-center flex-col'>
      <div className='flex'>
        {renderBlock(
          !!user?.name,
          <strong>{user?.name}</strong>,
          'font-semibold hidden sm:block flex'
        )}
        {renderBlock(!!user?.email, <span> [{user?.email}]</span>, 'ml-2 hidden sm:block')}
      </div>
      {renderBlock(
        !!user?.website || !!user?.phone,
        <>
          <strong>Contact:</strong> {user?.website} or {user?.phone}
        </>,
        'hidden sm:block'
      )}
      {renderBlock(
        !!user?.address,
        <>
          <strong>From:</strong> {user?.address?.street}, {user?.address?.suite},{' '}
          {user?.address?.city}, {user?.address?.zipcode}
        </>,
        'hidden xl:block'
      )}
      {renderBlock(
        !!user?.company,
        <>
          <strong>Company:</strong> {user?.company?.name} - {user?.company?.catchPhrase},{' '}
          {user?.company?.bs}
        </>,
        'hidden xl:block'
      )}
    </div>
  )
}

export default UserAdditionalInfo
