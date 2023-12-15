import React, { FC } from 'react'
import { User } from '../types/types'

interface PostCreatorInfoProps {
  user: User
}

const PostCreatorInfo: FC<PostCreatorInfoProps> = ({ user }: PostCreatorInfoProps) => {
  return (
    <>
      {user ? (
        <div>
          <p className='font-bold'>{user.name}</p>
          <p className='text-sm'>{Math.floor(Math.random() * 10) + 1} hours ago</p>
        </div>
      ) : (
        <p>Loading autor...</p>
      )}
    </>
  )
}

export default PostCreatorInfo
