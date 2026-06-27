export const formatDate = (date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string => {
  const d = new Date(date)
  if (format === 'short') return d.toLocaleDateString('fr-FR')
  if (format === 'long') return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return d.toLocaleString('fr-FR')
}

export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-CD', { style: 'currency', currency: 'CDF' }).format(amount)
}

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return ''
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
}

export const formatDossierNumber = (num: string): string => {
  return num.toUpperCase()
}