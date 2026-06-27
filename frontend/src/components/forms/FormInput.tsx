import { forwardRef } from 'react'
import { GlassInput } from '@/components/glassmorphic/GlassInput'

interface FormInputProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, type = 'text', placeholder, required, error, ...props }, ref) => {
    return (
      <GlassInput
        ref={ref}
        label={label}
        type={type}
        placeholder={placeholder}
        required={required}
        error={error}
        {...props}
      />
    )
  }
)
FormInput.displayName = 'FormInput'