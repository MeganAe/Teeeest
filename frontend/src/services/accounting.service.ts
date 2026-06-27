import { api } from './api'

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  account: string
  date: string
  createdBy: string
}

export const accountingService = {
  async getCashJournal(startDate?: string, endDate?: string) {
    const res = await api.get('/accounting/cash-journal', { params: { startDate, endDate } })
    return res.data
  },

  async getLedger(account?: string) {
    const res = await api.get('/accounting/ledger', { params: { account } })
    return res.data
  },

  async getBalanceSheet(date?: string) {
    const res = await api.get('/accounting/balance-sheet', { params: { date } })
    return res.data
  },

  async getIncomeStatement(startDate?: string, endDate?: string) {
    const res = await api.get('/accounting/income-statement', { params: { startDate, endDate } })
    return res.data
  },

  async getTreasury() {
    const res = await api.get('/accounting/treasury')
    return res.data
  },

  async createExpense(data: Omit<Expense, 'id' | 'createdBy'>) {
    const res = await api.post('/accounting/expenses', data)
    return res.data
  },

  async getExpenses(params?: { category?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) {
    const res = await api.get('/accounting/expenses', { params })
    return res.data
  },
}