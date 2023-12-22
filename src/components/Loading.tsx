import { FC } from 'react'
import { BarLoader } from 'react-spinners'

const Loading: FC = () => {
  return <BarLoader color='#6366f1' width={500} />
}

export default Loading
