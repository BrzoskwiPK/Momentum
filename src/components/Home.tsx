import { useQuery } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import SignIn from './SignIn'

const Home: FunctionComponent = () => {
  return (
    <main className='w-full flex-grow flex items-center justify-center'>
      <SignIn />
    </main>
  )
}

export default Home
