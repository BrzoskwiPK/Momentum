import { ChangeEvent, FC, FormEvent } from 'react'

interface SignInFormProps {
  onSubmit: (e: FormEvent<Element>) => Promise<void>
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
  onEmailChange,
  onUsernameChange,
}: SignInFormProps) => {
  return (
    <form className='space-y-6' onSubmit={e => onSubmit(e)}>
      <div>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Username
        </label>
        <div className='mt-2'>
          <input
            id='username'
            name='username'
            type='username'
            autoComplete='username'
            required
            onChange={e => onUsernameChange(e)}
            className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
            Email address
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            onChange={e => onEmailChange(e)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SignInForm
