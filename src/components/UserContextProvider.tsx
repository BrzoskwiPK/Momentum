import { FC, useState } from 'react'
import UserContext from '../contexts/user-context'
import { User } from '../types/types'

interface UserContextProviderProps {
  children: React.ReactNode
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Partial<User> | null>(null)

  const contextValue = {
    user,
    setUser,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContextProvider
