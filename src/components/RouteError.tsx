import { Link } from 'react-router-dom'

const RouteError = () => {
  return (
    <main className='w-full h-screen flex flex-col items-center justify-center'>
      <aside>OOPS!</aside>
      <section className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          PAGE NOT FOUND!
        </h2>
        <Link
          to='/'
          type='button'
          className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          BACK TO HOMEPAGE
        </Link>
      </section>
    </main>
  )
}

export default RouteError
