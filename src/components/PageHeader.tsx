import { FC } from 'react'

interface PageHeaderProps {
  page: string
  item: string
  onClick: () => void
}

const PageHeader: FC<PageHeaderProps> = ({ page, item, onClick }: PageHeaderProps) => {
  return (
    <div className='w-full px-10 my-6 border-b-4 pb-4 flex flex-col'>
      <h2 className='text-3xl'>{page}</h2>
      <p className='underline hover:cursor-pointer self-end' onClick={onClick}>
        Add your own {item}
      </p>
    </div>
  )
}

export default PageHeader
