import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

type Props = {
  children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }: Props) => {
  const { isAuthenticated } = useAuthenticatedUser()

  if (!isAuthenticated) return <Navigate to='/' replace />

  return children
}

export default ProtectedRoute
