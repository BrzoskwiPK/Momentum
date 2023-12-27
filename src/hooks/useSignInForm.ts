import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllUsers } from '../api/users'
import { User } from '../types/types'

export const useSignInForm = () => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [formError, setFormError] = useState<string>('')

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleAuthentication = async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchAllUsers,
      staleTime: 600000,
    })

    const authenticatedUser: User | undefined = data.find(
      user => user.email === email && user.username === username
    )

    if (!authenticatedUser) {
      setFormError('Incorrect username or email')
      return
    }

    const user: User = {
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      username: authenticatedUser.username,
      email: authenticatedUser.email,
      address: authenticatedUser.address,
      phone: authenticatedUser.phone,
      website: authenticatedUser.website,
      company: authenticatedUser.company,
    }

    localStorage.setItem('userInfo', JSON.stringify(user))
    window.dispatchEvent(new Event('storage'))

    setFormError('')
    redirectToDashboard()
  }

  const redirectToDashboard = () => navigate('/feed')

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    handleAuthentication()
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  return {
    email,
    username,
    formError,
    handleSignIn,
    handleEmailChange,
    handleUsernameChange,
  }
}
