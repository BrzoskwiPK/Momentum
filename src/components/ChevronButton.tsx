import { FC, ReactNode } from 'react'

interface ChevronProps {
  children: ReactNode
  className: string

  onClick: () => void
}

const ChevronButton: FC<ChevronProps> = ({ children, onClick, className }: ChevronProps) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
)

export default ChevronButton
