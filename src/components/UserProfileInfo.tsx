import { FC } from 'react'
import { User } from '../types/types'

interface UserProfileInfoProps {
  user: User
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({ user }: UserProfileInfoProps) => {
  return (
    <div className='w-full h-[200px] sm:mb-4 md:mb-0 flex flex-col md:flex-row items-center justify-center'>
      <div className='flex-shrink-0 md:mb-0'>
        <img
          src={`./assets/profile-${user.id}.jpg`}
          alt=''
          className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover rounded-full bg-gray-500'
        />
      </div>
      <div className='h-[100px] md:h-full xl:w-[600px] lg:w-[400px] md:w-[400px] md:ml-10 flex flex-shrink-0 flex-col justify-center'>
        <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
          <p className='font-bold text-xl'>{user?.username}</p>
          <button className='ml-4 bg-gray-400 text-white px-4 rounded-md h-8 hover:bg-gray-600'>
            Edit
          </button>
        </div>
        <div className='flex justify-center flex-col'>
          <p className='font-semibold hidden sm:block'>
            {user?.name} [{user?.email}]
          </p>
          <p className='hidden sm:block'>
            <strong>Contact:</strong> {user?.website} or {user?.phone}
          </p>
          {user?.address && (
            <p className='hidden xl:block'>
              <strong>From:</strong> {user.address.street}, {user.address.suite},{' '}
              {user.address.city}, {user.address.zipcode}
            </p>
          )}
          {user?.company && (
            <p className='hidden xl:block'>
              <strong>Company:</strong> {user.company.name} - {user.company.catchPhrase},{' '}
              {user.company.bs}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
