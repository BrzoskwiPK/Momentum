import { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthenticatedUser()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
