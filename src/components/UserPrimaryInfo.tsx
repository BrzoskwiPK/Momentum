import { FC, useState } from 'react'
import EditForm from './EditForm'
import { User } from '../types/types'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface UserPrimaryInfoProps {
  username: string
}

const UserPrimaryInfo: FC<UserPrimaryInfoProps> = ({ username }: UserPrimaryInfoProps) => {
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const { userContext } = useAuthenticatedUser()

  const handleEditProfileInfo = () => {
    setIsEditView(true)
  }

  return (
    <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
      <p className='font-bold text-xl'>{username}</p>
      {username === userContext.username ? (
        <button
          className='ml-4 bg-gray-300 text-white px-4 rounded-md h-7 hover:bg-gray-400 transition duration-200 ease-in-out'
          onClick={handleEditProfileInfo}>
          Edit
        </button>
      ) : null}
      {isEditView ? (
        <EditForm user={userContext} handleCancel={() => setIsEditView(false)} />
      ) : null}
    </div>
  )
}

export default UserPrimaryInfo
