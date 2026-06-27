import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateExpenseDto } from './dto/create-expense.dto'

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async getCashJournal(startDate?: Date, endDate?: Date) {
    const where: any = {}
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    const [incomes, expenses] = await Promise.all([
      this.prisma.payment.findMany({ where: { ...where, status: 'COMPLETED' } }),
      this.prisma.expense.findMany({ where }),
    ])

    const totalIncome = incomes.reduce((sum, i) => sum + i.montant, 0)
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)

    return {
      period: { startDate, endDate },
      incomes: { total: totalIncome, items: incomes },
      expenses: { total: totalExpense, items: expenses },
      balance: totalIncome - totalExpense,
    }
  }

  async getLedger(account?: string) {
    const where: any = {}
    if (account) where.account = account

    const expenses = await this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    })

    const grouped = expenses.reduce((acc, e) => {
      if (!acc[e.account]) acc[e.account] = { total: 0, items: [] }
      acc[e.account].total += e.amount
      acc[e.account].items.push(e)
      return acc
    }, {})

    return grouped
  }

  async getBalanceSheet(date: Date) {
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    const [totalIncome, totalExpenses, pendingPayments] = await Promise.all([
      this.prisma.payment.aggregate({
        where: { createdAt: { lte: endDate }, status: 'COMPLETED' },
        _sum: { montant: true },
      }),
      this.prisma.expense.aggregate({
        where: { date: { lte: endDate } },
        _sum: { amount: true },
      }),
      this.prisma.payment.aggregate({
        where: { createdAt: { lte: endDate }, status: 'PENDING' },
        _sum: { montant: true },
      }),
    ])

    const assets = (totalIncome._sum.montant || 0) - (totalExpenses._sum.amount || 0)
    const liabilities = pendingPayments._sum.montant || 0

    return {
      date,
      assets,
      liabilities,
      equity: assets - liabilities,
      details: { totalIncome: totalIncome._sum.montant || 0, totalExpenses: totalExpenses._sum.amount || 0, pendingPayments: liabilities },
    }
  }

  async getIncomeStatement(startDate?: Date, endDate?: Date) {
    const where: any = {}
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    const [incomes, expenses] = await Promise.all([
      this.prisma.payment.findMany({ where: { ...where, status: 'COMPLETED' } }),
      this.prisma.expense.findMany({ where: { ...where } }),
    ])

    const byType = incomes.reduce((acc, i) => {
      acc[i.type] = (acc[i.type] || 0) + i.montant
      return acc
    }, {})

    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})

    const totalIncome = incomes.reduce((sum, i) => sum + i.montant, 0)
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)

    return {
      period: { startDate, endDate },
      revenue: { total: totalIncome, byType },
      expenses: { total: totalExpense, byCategory },
      netIncome: totalIncome - totalExpense,
    }
  }

  async getTreasury() {
    const [totalIncome, totalExpenses] = await Promise.all([
      this.prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { montant: true } }),
      this.prisma.expense.aggregate({ _sum: { amount: true } }),
    ])

    const last30DaysIncome = await this.prisma.payment.aggregate({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, status: 'COMPLETED' },
      _sum: { montant: true },
    })

    const last30DaysExpenses = await this.prisma.expense.aggregate({
      where: { date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      _sum: { amount: true },
    })

    return {
      currentBalance: (totalIncome._sum.montant || 0) - (totalExpenses._sum.amount || 0),
      last30Days: {
        income: last30DaysIncome._sum.montant || 0,
        expenses: last30DaysExpenses._sum.amount || 0,
        balance: (last30DaysIncome._sum.montant || 0) - (last30DaysExpenses._sum.amount || 0),
      },
    }
  }

  async createExpense(dto: CreateExpenseDto, userId: string) {
    return this.prisma.expense.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        category: dto.category,
        account: dto.account,
        date: new Date(dto.date),
        createdBy: userId,
      },
    })
  }

  async getExpenses(query: any) {
    const { page = 1, limit = 10, category, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: any = {}
    if (category) where.category = category
    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate)
      if (endDate) where.date.lte = new Date(endDate)
    }

    const [expenses, total] = await Promise.all([
      this.prisma.expense.findMany({ where, skip, take: parseInt(limit), orderBy: { date: 'desc' } }),
      this.prisma.expense.count({ where }),
    ])

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0)

    return { expenses, total, totalAmount, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }
}