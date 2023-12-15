import { useEffect, useState } from 'react'
import { User } from '../types/types'

export const useAuthenticatedUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      try {
        const parsedUserInfo: User = JSON.parse(userInfo)
        setUser(parsedUserInfo)
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [])

  return { isAuthenticated: Boolean(user), userContext: user }
}
