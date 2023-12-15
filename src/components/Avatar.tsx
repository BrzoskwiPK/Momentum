import React, { FC } from 'react'
import CircleIcon from './CircleIcon'
import { User } from '../types/types'

interface AvatarProps {
  user: User
}

const Avatar: FC<AvatarProps> = ({ user }: AvatarProps) => {
  return (
    <>
      {user ? (
        <CircleIcon size={42} imageUrl={`./assets/profile-${user.id}.jpg`} />
      ) : (
        <p>Loading avatar...</p>
      )}
    </>
  )
}

export default Avatar
