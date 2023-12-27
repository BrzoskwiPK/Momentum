import { FC, useCallback, useEffect, useState } from 'react'
import Option from './Option'
import { OptionProps } from '../types/types'
import React from 'react'

interface SelectProps {
  fieldName: string
  options: OptionProps[]
  setCurrentValue: (value: string) => void
}

const Select: FC<SelectProps> = ({ fieldName, options, setCurrentValue }: SelectProps) => {
  const [isDefaultValueSet, setIsDefaultValueSet] = useState(false)

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value
      if (setCurrentValue) {
        setCurrentValue(selectedValue)
      }
    },
    [setCurrentValue]
  )

  useEffect(() => {
    if (!isDefaultValueSet && options && options.length > 0) {
      const firstOptionValue = options[0].value
      setCurrentValue && setCurrentValue(firstOptionValue)
      setIsDefaultValueSet(true)
    }
  }, [options, setCurrentValue, isDefaultValueSet])

  return (
    <>
      <select
        id={fieldName}
        className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        onChange={handleOnChange}>
        {options
          ? options.map((option, index) => (
              <Option key={index} value={option.value} label={option.label} />
            ))
          : null}
      </select>
    </>
  )
}

export default Select
