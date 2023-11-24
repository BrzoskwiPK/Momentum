import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react'
import SignInForm from './SignInForm'
import { useQueryClient } from '@tanstack/react-query'
import { fetchAllUsers } from '../api/users'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/user-context'
import { User } from '../types/types'

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [formError, setFormError] = useState<string>('')

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const userContext = useContext(UserContext)

  // EMAIL: "Shanna@melissa.tv" LOGIN: "Antonette"
  const handleAuthentication = async () => {
    const data = await queryClient.ensureQueryData({ queryKey: ['users'], queryFn: fetchAllUsers })

    const authenticatedUser: User | undefined = data.find(
      user => user.email === email && user.username === username
    )

    if (!authenticatedUser) {
      setFormError('Incorrect username or email')
      return
    }

    userContext?.setUser({
      email: authenticatedUser.email,
      username: authenticatedUser.username,
      id: authenticatedUser.id,
    })

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

  return (
    <div className='h-full w-full flex flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img className='mx-auto h-10 w-auto' src='/assets/logo.png' alt='WSEI' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <SignInForm
          onSubmit={handleSignIn}
          onEmailChange={handleEmailChange}
          onUsernameChange={handleUsernameChange}
        />
      </div>
      {formError ? (
        <div className='w-full text-red-600 font-bold text-center mt-5'>{formError}</div>
      ) : null}
    </div>
  )
}

export default SignIn
