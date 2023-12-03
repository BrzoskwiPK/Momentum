import { FC, useContext, useState } from 'react'
import UserContext from '../contexts/user-context'
import EditForm from './EditForm'
import { User } from '../types/types'

interface UserPrimaryInfoProps {
  username: string
}

const UserPrimaryInfo: FC<UserPrimaryInfoProps> = ({ username }: UserPrimaryInfoProps) => {
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const userContext = useContext(UserContext)
  const user: Partial<User> = userContext?.user!

  const handleEditProfileInfo = () => {
    setIsEditView(true)
  }

  return (
    <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
      <p className='font-bold text-xl'>{username}</p>
      {username === user.username ? (
        <button
          className='ml-4 bg-gray-300 text-white px-4 rounded-md h-7 hover:bg-gray-400 transition duration-200 ease-in-out'
          onClick={handleEditProfileInfo}>
          Edit
        </button>
      ) : null}
      {isEditView ? <EditForm user={user} handleCancel={() => setIsEditView(false)} /> : null}
    </div>
  )
}

export default UserPrimaryInfo
