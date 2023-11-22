import { FC, useContext } from 'react'
import UserContext from '../contexts/user-context'
import { isAuthenticated } from '../utils/helpers'
import { Navigate } from 'react-router-dom'
import { UserAccount } from '../types/types'

type Props = {
  children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }: Props) => {
  const userContext = useContext(UserContext)
  const user: UserAccount = userContext?.user!

  if (!isAuthenticated(user)) return <Navigate to='/' replace />

  return children
}

export default ProtectedRoute
