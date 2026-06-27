import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { Prisma, PaymentStatus } from '@prisma/client'

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async generateReceiptNumber(): Promise<string> {
    const year = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
    const lastPayment = await this.prisma.payment.findFirst({
      orderBy: { receiptNumber: 'desc' },
      where: { receiptNumber: { startsWith: `REC-${year}${month}` } },
    })

    let sequence = 1
    if (lastPayment) {
      const lastNumber = parseInt(lastPayment.receiptNumber.split('-')[2])
      sequence = lastNumber + 1
    }

    return `REC-${year}${month}-${sequence.toString().padStart(6, '0')}`
  }

  async generateReference(): Promise<string> {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `PAY-${timestamp}-${random}`
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, startDate, endDate, type, status } = query
    const skip = (page - 1) * limit

    const where: Prisma.PaymentWhereInput = {}
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }
    if (type) where.type = type
    if (status) where.status = status as PaymentStatus

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: {
            select: { id: true, nom: true, prenom: true, numeroDossier: true },
          },
          collector: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      }),
      this.prisma.payment.count({ where }),
    ])

    const totalAmount = await this.prisma.payment.aggregate({
      where: { ...where, status: 'COMPLETED' },
      _sum: { montant: true },
    })

    return {
      payments,
      total,
      totalAmount: totalAmount._sum.montant || 0,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getDailyClosure(date: Date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const payments = await this.prisma.payment.findMany({
      where: {
        createdAt: { gte: startOfDay, lte: endOfDay },
        status: 'COMPLETED',
      },
      include: {
        collector: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    })

    const byMethod = {
      ESPECES: 0,
      MOBILE_MONEY: 0,
      CARTE: 0,
      VIREMENT: 0,
    }

    const byType = {}

    for (const payment of payments) {
      byMethod[payment.modePaiement] += payment.montant
      byType[payment.type] = (byType[payment.type] || 0) + payment.montant
    }

    const total = payments.reduce((sum, p) => sum + p.montant, 0)

    return {
      date,
      total,
      byMethod,
      byType,
      count: payments.length,
      payments,
    }
  }

  async getStats(startDate?: Date, endDate?: Date) {
    const where: Prisma.PaymentWhereInput = { status: 'COMPLETED' }
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    const payments = await this.prisma.payment.findMany({ where })
    
    const total = payments.reduce((sum, p) => sum + p.montant, 0)
    const byType = {}
    const byMethod = {}
    const daily = {}

    for (const payment of payments) {
      byType[payment.type] = (byType[payment.type] || 0) + payment.montant
      byMethod[payment.modePaiement] = (byMethod[payment.modePaiement] || 0) + payment.montant
      
      const dateKey = payment.createdAt.toISOString().split('T')[0]
      daily[dateKey] = (daily[dateKey] || 0) + payment.montant
    }

    return {
      total,
      count: payments.length,
      byType,
      byMethod,
      daily: Object.entries(daily).map(([date, amount]) => ({ date, amount })),
    }
  }

  async getByReceiptNumber(receiptNumber: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { receiptNumber },
      include: {
        patient: true,
        collector: true,
      },
    })

    if (!payment) {
      throw new NotFoundException(`Reçu ${receiptNumber} non trouvé`)
    }

    return payment
  }

  async getByPatient(patientId: string) {
    return this.prisma.payment.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        collector: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    })
  }

  async create(createPaymentDto: CreatePaymentDto, userId: string) {
    const receiptNumber = await this.generateReceiptNumber()
    const reference = await this.generateReference()

    return this.prisma.payment.create({
      data: {
        patientId: createPaymentDto.patientId,
        montant: createPaymentDto.montant,
        type: createPaymentDto.type,
        reference,
        modePaiement: createPaymentDto.modePaiement,
        receiptNumber,
        collectedBy: userId,
      },
      include: {
        patient: {
          select: { id: true, nom: true, prenom: true, numeroDossier: true },
        },
        collector: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    })
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({ where: { id } })
    if (!payment) {
      throw new NotFoundException(`Paiement avec ID ${id} non trouvé`)
    }

    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    })
  }

  async refund(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } })
    if (!payment) {
      throw new NotFoundException(`Paiement avec ID ${id} non trouvé`)
    }

    if (payment.status === 'REFUNDED') {
      throw new BadRequestException('Ce paiement a déjà été remboursé')
    }

    return this.prisma.payment.update({
      where: { id },
      data: { status: 'REFUNDED' },
    })
  }
}