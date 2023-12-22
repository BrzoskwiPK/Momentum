import { FC } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  defaultValue?: string
  onChange: (value: string) => void
}

const FormField: FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  defaultValue,
  onChange,
}: FormFieldProps) => (
  <div className='sm:col-span-2 my-2'>
    <label htmlFor={name} className='block mb-1 text-sm font-medium leading-6 text-gray-900'>
      {label}
    </label>
    <div>
      <input
        type={type}
        name={name}
        id={name}
        value={value !== '' ? value : defaultValue}
        onChange={e => onChange(e.target.value)}
        maxLength={50}
        required
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
    </div>
  </div>
)

export default FormField
