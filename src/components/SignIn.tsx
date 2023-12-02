import { FC } from 'react'
import SignInForm from './SignInForm'
import { useSignInForm } from '../hooks/useSignInForm'

const SignIn: FC = () => {
  const { formError, handleSignIn, handleEmailChange, handleUsernameChange } = useSignInForm()

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
