import { FC } from 'react'
import { User } from '../types/types'
import { Link } from 'react-router-dom'

interface UserCardProps {
  user: User
}

const UserCard: FC<UserCardProps> = ({ user }: UserCardProps) => {
  const navigationLink = `/profile/${user.id}`
  return (
    <Link key={user.id} to={navigationLink}>
      <div className='flex items-center w-[300px] my-3 p-1 hover:bg-slate-100 hover:cursor-pointer'>
        <img
          src={`./assets/profile-${user.id}.jpg`}
          alt='Profile avatar card'
          className='w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] object-cover rounded-full bg-gray-500 border-2 border-black'
        />
        <div className='ml-3 flex flex-col'>
          <strong>{user.username}</strong>
          <p>{user.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default UserCard
