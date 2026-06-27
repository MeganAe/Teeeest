import { forwardRef } from 'react'
import { Select } from '@/components/ui/Select'

interface FormSelectProps {
  name: string
  label?: string
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ name, label, options, required, error, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        label={label}
        options={options}
        required={required}
        error={error}
        {...props}
      />
    )
  }
)
FormSelect.displayName = 'FormSelect'