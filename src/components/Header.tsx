import { FunctionComponent } from 'react'
import Navigation from './Navigation'

const Header: FunctionComponent = () => {
  return (
    <header className='header col-start-1 col-end-2 row-span-2'>
      <Navigation />
    </header>
  )
}

export default Header
