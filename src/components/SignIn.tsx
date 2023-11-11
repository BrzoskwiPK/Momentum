import { ChangeEvent, FC, FormEvent, useState } from 'react'
import SignInForm from './SignInForm'
import { useQueryClient } from '@tanstack/react-query'
import { fetchAllUsers } from '../api/users'

const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [formError, setFormError] = useState<string>('')

  const queryClient = useQueryClient()

  const handleAuthentication = async () => {
    const data = await queryClient.ensureQueryData({ queryKey: ['users'], queryFn: fetchAllUsers })

    let isAuthenticated = data.some(user => user.email === email && user.username === username)

    if (!isAuthenticated) {
      setFormError('Incorrect username or email')
    } else {
      setFormError('')
      redirectToDashboard()
    }
  }

  const redirectToDashboard = () => console.log('xd')

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    handleAuthentication()
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
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
