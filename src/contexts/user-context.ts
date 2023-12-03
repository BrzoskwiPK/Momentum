import { Dispatch, SetStateAction, createContext } from 'react'
import { User } from '../types/types'

interface UserContextType {
  user: Partial<User> | null
  setUser: Dispatch<SetStateAction<Partial<User> | null>>
}

const UserContext = createContext<UserContextType | null>(null)

export default UserContext
