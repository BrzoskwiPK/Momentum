import { FC, MouseEventHandler, ReactNode } from 'react'

interface ChevronButtonProps {
  children: ReactNode | ReactNode[]
  className: string

  onClick: MouseEventHandler<HTMLButtonElement>
}

const ChevronButton: FC<ChevronButtonProps> = ({
  onClick,
  className,
  children,
}: ChevronButtonProps) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
)

export default ChevronButton
