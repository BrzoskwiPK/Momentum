import { useContext } from 'react'
import { isAuthenticated } from '../utils/helpers'
import UserContext from '../contexts/user-context'

export const useAuthenticatedUser = () => {
  const userContext = useContext(UserContext)
  const authenticatedUser = isAuthenticated(userContext?.user!)

  return { isAuthenticated: authenticatedUser, userContext: userContext?.user! }
}
