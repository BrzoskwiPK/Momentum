import { FC, MouseEventHandler, ReactNode } from 'react'

interface ChevronProps {
  children: ReactNode | ReactNode[]
  className: string

  onClick: MouseEventHandler<HTMLButtonElement>
}

const ChevronButton: FC<ChevronProps> = ({ children, onClick, className }: ChevronProps) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
)

export default ChevronButton
