import { FC } from 'react'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'
import { useNavigate } from 'react-router-dom'

interface UserPrimaryInfoProps {
  username: string
}

const UserPrimaryInfo: FC<UserPrimaryInfoProps> = ({ username }: UserPrimaryInfoProps) => {
  const { userContext } = useAuthenticatedUser()
  const navigate = useNavigate()

  const handleEditProfileInfo = () => {
    navigate('/editProfile')
  }

  return (
    <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
      <p className='font-bold text-xl'>{username}</p>
      {username === userContext?.username ? (
        <button
          className='rounded-md bg-indigo-600 ml-3 mt-1 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={handleEditProfileInfo}>
          Edit
        </button>
      ) : null}
    </div>
  )
}

export default UserPrimaryInfo
