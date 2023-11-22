import { FC, useContext } from 'react'
import UserContext from '../contexts/user-context'
import { useNavigate } from 'react-router-dom'

const Logout: FC = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    userContext?.setUser(null)
  }

  const redirectToFeed = () => {
    navigate('/feed')
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <p className='font-bold text-center'>Do you really want to logout?</p>
      <div className='flex items-center justify-center mt-5'>
        <button
          onClick={handleLogout}
          className='mx-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          YES
        </button>
        <button
          onClick={redirectToFeed}
          className='mx-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          NO
        </button>
      </div>
    </div>
  )
}

export default Logout
