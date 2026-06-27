import { forwardRef } from 'react'
import { GlassInput } from '@/components/glassmorphic/GlassInput'

interface FormDatePickerProps {
  name: string
  label?: string
  required?: boolean
  error?: string
}

export const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(
  ({ name, label, required, error, ...props }, ref) => {
    return (
      <GlassInput
        ref={ref}
        label={label}
        type="date"
        required={required}
        error={error}
        {...props}
      />
    )
  }
)
FormDatePicker.displayName = 'FormDatePicker'