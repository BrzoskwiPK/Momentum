import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthenticatedUser()

  if (isLoading) {
    return <div className='w-full h-full flex justify-center'>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
