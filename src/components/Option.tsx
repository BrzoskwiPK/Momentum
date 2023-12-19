import { FC } from 'react'

interface OptionProps {
  value: string
  label: string
}

const Option: FC<OptionProps> = ({ value, label }: OptionProps) => {
  return <option value={value}>{label}</option>
}

export default Option
