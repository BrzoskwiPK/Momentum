import { FC } from 'react'

interface PageHeaderProps {
  page: string
  item: string
  onClick: () => void
}

const PageHeader: FC<PageHeaderProps> = ({ page, item, onClick }: PageHeaderProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      onClick()
    }
  }

  return (
    <div
      className='w-full px-10 mt-6 border-b-4 pb-4 flex flex-col md:justify-normal justify-center'
      onKeyUp={handleKeyDown}>
      <h2 className='md:text-3xl md:text-left text-center text-2xl font-bold'>{page}</h2>
      <p
        className='underline hover:cursor-pointer md:self-end text-center md:text-right font-semibold'
        onClick={onClick}
        tabIndex={0}>
        Add your own {item}
      </p>
    </div>
  )
}

export default PageHeader
