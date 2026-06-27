import { forwardRef } from 'react'
import { Textarea } from '@/components/ui/Textarea'

interface FormTextareaProps {
  name: string
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  error?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ name, label, placeholder, rows = 3, required, error, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        label={label}
        placeholder={placeholder}
        rows={rows}
        required={required}
        error={error}
        {...props}
      />
    )
  }
)
FormTextarea.displayName = 'FormTextarea'