import { FC } from 'react'

interface UserPrimaryInfoProps {
  username: string
}

const UserPrimaryInfo: FC<UserPrimaryInfoProps> = ({ username }: UserPrimaryInfoProps) => (
  <div className='w-full h-10 flex items-center justify-start mt-4 md:mt-0'>
    <p className='font-bold text-xl'>{username}</p>
    <button className='ml-4 bg-gray-300 text-white px-4 rounded-md h-7 hover:bg-gray-400 transition duration-200 ease-in-out'>
      Edit
    </button>
  </div>
)

export default UserPrimaryInfo
