import { Dispatch, SetStateAction, createContext } from 'react'
import { UserAccount } from '../types/types'

interface UserContextType {
  user: UserAccount | null
  setUser: Dispatch<SetStateAction<UserAccount>>
}

const UserContext = createContext<UserContextType | null>(null)

export default UserContext
