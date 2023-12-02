import { FC, useContext } from 'react'
import { UserAccount } from '../types/types'
import UserContext from '../contexts/user-context'

interface UserPrimaryInfoProps {
  username: string
}

const UserPrimaryInfo: FC<UserPrimaryInfoProps> = ({ username }: UserPrimaryInfoProps) => {
  const userContext = useContext(UserContext)
  const userCredentials: UserAccount = userContext?.user!

  const handleEditProfileInfo = (userCredentials: UserAccount) => {
    console.log('to be edited' + userCredentials)
  }

  return (
    <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
      <p className='font-bold text-xl'>{username}</p>
      {username === userCredentials.username ? (
        <button
          className='ml-4 bg-gray-300 text-white px-4 rounded-md h-7 hover:bg-gray-400 transition duration-200 ease-in-out'
          onClick={() => handleEditProfileInfo(userCredentials)}>
          Edit
        </button>
      ) : null}
    </div>
  )
}

export default UserPrimaryInfo
