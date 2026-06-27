export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  return regex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const regex = /^(\+243|0)[1-9]\d{7,8}$/
  return regex.test(phone)
}

export const validateDossierNumber = (num: string): boolean => {
  const regex = /^AMKA-\d{4}-\d{5}$/
  return regex.test(num)
}

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) return { isValid: false, message: 'Au moins 6 caractères' }
  if (!/[A-Z]/.test(password)) return { isValid: false, message: 'Au moins une majuscule' }
  if (!/[0-9]/.test(password)) return { isValid: false, message: 'Au moins un chiffre' }
  return { isValid: true }
}