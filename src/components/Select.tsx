import { FC, useCallback } from 'react'
import Option from './Option'
import { OptionProps } from '../types/types'
import React from 'react'

interface SelectProps {
  fieldName: string
  options?: OptionProps[]
  setCurrentValue?: (value: string) => void
}

const arePropsEqual = (prevProps: SelectProps, nextProps: SelectProps) => {
  return (
    prevProps.fieldName === nextProps.fieldName &&
    prevProps.setCurrentValue === nextProps.setCurrentValue &&
    prevProps.options === nextProps.options
  )
}

const Select: FC<SelectProps> = React.memo(
  ({ fieldName, options, setCurrentValue }: SelectProps) => {
    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        if (setCurrentValue) {
          setCurrentValue(selectedValue)
        }
      },
      [setCurrentValue]
    )

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
  },
  arePropsEqual
)

export default Select
