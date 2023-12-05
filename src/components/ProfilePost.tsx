import { FC } from 'react'

interface ProfilePostProps {
  userId: number
  id: number
  title: string
  body: string
}

const ProfilePost: FC<ProfilePostProps> = ({ userId, id, title, body }: ProfilePostProps) => {
  return (
    <li key={id} className='mb-4 h-auto list-none'>
      <div className='bg-white p-4 border rounded-md h-full'>
        <h3 className='text-xl font-semibold mb-2'>{title}</h3>
        <p>{body}</p>
      </div>
    </li>
  )
}

export default ProfilePost
