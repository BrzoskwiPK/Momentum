import { useEffect, useState } from 'react'
import { User } from '../types/types'

export const useAuthenticatedUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getLocalStorageInfo = () => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo)
        setUser(parsedUserInfo)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        setUser(null)
      }
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getLocalStorageInfo()

    window.addEventListener('storage', getLocalStorageInfo)

    return () => window.removeEventListener('storage', getLocalStorageInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isAuthenticated, userContext: user, isLoading }
}
