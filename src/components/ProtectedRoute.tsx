import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthenticatedUser()

  if (!isAuthenticated) return <Navigate to='/' replace />

  return children
}

export default ProtectedRoute
