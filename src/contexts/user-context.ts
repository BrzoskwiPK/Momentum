import { createContext } from 'react'
import { UserAccount } from '../types/types'

const UserContext = createContext<UserAccount>(null)

export default UserContext
