export interface FinancialReport {
  period: { startDate: Date; endDate: Date }
  summary: {
    totalRevenue: number
    totalTransactions: number
    totalConsultations: number
    totalHospitalizations: number
    pharmacyRevenue: number
  }
  breakdown: {
    byType: Record<string, number>
    byMethod: Record<string, number>
  }
  payments: any[]
}

export interface MedicalReport {
  period: { startDate: Date; endDate: Date }
  consultations: {
    total: number
    byMedecin: Record<string, number>
    topDiagnostics: [string, number][]
  }
  exams: {
    total: number
    completed: number
    byType: Record<string, number>
  }
  hospitalizations: {
    total: number
    averageDuration: number
  }
  prescriptions: {
    total: number
    topMedications: Record<string, number>
  }
}

export interface ActivityReport {
  period: { startDate: Date; endDate: Date }
  timeline: Array<{
    date: string
    patients: number
    consultations: number
    revenue: number
  }>
}

export interface PharmacyReport {
  period: { startDate: Date; endDate: Date }
  summary: {
    totalRevenue: number
    totalSales: number
    totalQuantity: number
    averagePerSale: number
  }
  lowStock: Array<{ name: string; stock: number; threshold: number }>
  expiring: Array<{ name: string; expiryDate?: Date }>
  topProducts: any[]
}