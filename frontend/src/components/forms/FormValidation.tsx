import { CheckCircle, AlertCircle } from 'lucide-react'

interface FormValidationProps {
  isValid?: boolean
  message?: string
}

export function FormValidation({ isValid, message }: FormValidationProps) {
  if (!message) return null

  return (
    <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
      {isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      <span>{message}</span>
    </div>
  )
}