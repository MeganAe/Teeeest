import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateMedicationDto } from './dto/create-medication.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { SellMedicationDto } from './dto/sell-medication.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}

  async generateMedicationCode(): Promise<string> {
    const count = await this.prisma.medication.count()
    return `MED-${(count + 1).toString().padStart(6, '0')}`
  }

  async getAllMedications(query: any) {
    const { page = 1, limit = 10, search, category } = query
    const skip = (page - 1) * limit

    const where: Prisma.MedicationWhereInput = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (category) {
      where.category = category
    }

    const [medications, total] = await Promise.all([
      this.prisma.medication.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { name: 'asc' },
      }),
      this.prisma.medication.count({ where }),
    ])

    return {
      medications,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getLowStock() {
    return this.prisma.medication.findMany({
      where: {
        stock: { lte: this.prisma.medication.fields.threshold },
      },
      orderBy: { stock: 'asc' },
    })
  }

  async getExpiring() {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    return this.prisma.medication.findMany({
      where: {
        expiryDate: { lte: thirtyDaysFromNow, not: null },
      },
      orderBy: { expiryDate: 'asc' },
    })
  }

  async getMedicationById(id: string) {
    const medication = await this.prisma.medication.findUnique({ where: { id } })
    if (!medication) {
      throw new NotFoundException(`Médicament avec ID ${id} non trouvé`)
    }
    return medication
  }

  async createMedication(createMedicationDto: CreateMedicationDto) {
    const code = await this.generateMedicationCode()

    return this.prisma.medication.create({
      data: {
        code,
        name: createMedicationDto.name,
        description: createMedicationDto.description,
        category: createMedicationDto.category,
        unit: createMedicationDto.unit,
        price: createMedicationDto.price,
        stock: createMedicationDto.stock || 0,
        threshold: createMedicationDto.threshold || 10,
        expiryDate: createMedicationDto.expiryDate ? new Date(createMedicationDto.expiryDate) : null,
      },
    })
  }

  async updateStock(id: string, updateStockDto: UpdateStockDto) {
    await this.getMedicationById(id)

    return this.prisma.medication.update({
      where: { id },
      data: { stock: updateStockDto.stock },
    })
  }

  async deleteMedication(id: string) {
    await this.getMedicationById(id)
    return this.prisma.medication.delete({ where: { id } })
  }

  async sellMedication(sellMedicationDto: SellMedicationDto, userId: string) {
    const medication = await this.getMedicationById(sellMedicationDto.medicationId)

    if (medication.stock < sellMedicationDto.quantity) {
      throw new BadRequestException(`Stock insuffisant. Disponible: ${medication.stock}`)
    }

    const totalPrice = sellMedicationDto.quantity * medication.price

    // Update stock
    await this.prisma.medication.update({
      where: { id: sellMedicationDto.medicationId },
      data: { stock: medication.stock - sellMedicationDto.quantity },
    })

    // Create sale record
    const sale = await this.prisma.sale.create({
      data: {
        medicationId: sellMedicationDto.medicationId,
        quantity: sellMedicationDto.quantity,
        unitPrice: medication.price,
        totalPrice,
        patientId: sellMedicationDto.patientId,
        prescriptionId: sellMedicationDto.prescriptionId,
        soldBy: userId,
      },
    })

    return sale
  }

  async getSales(query: any) {
    const { page = 1, limit = 10, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: Prisma.SaleWhereInput = {}
    if (startDate || endDate) {
      where.soldAt = {}
      if (startDate) where.soldAt.gte = new Date(startDate)
      if (endDate) where.soldAt.lte = new Date(endDate)
    }

    const [sales, total] = await Promise.all([
      this.prisma.sale.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { soldAt: 'desc' },
        include: {
          medication: true,
        },
      }),
      this.prisma.sale.count({ where }),
    ])

    return {
      sales,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getSalesStats(startDate?: Date, endDate?: Date) {
    const where: Prisma.SaleWhereInput = {}
    if (startDate || endDate) {
      where.soldAt = {}
      if (startDate) where.soldAt.gte = startDate
      if (endDate) where.soldAt.lte = endDate
    }

    const sales = await this.prisma.sale.findMany({ where })
    
    const total = sales.reduce((sum, s) => sum + s.totalPrice, 0)
    const byMedication = {}
    const daily = {}

    for (const sale of sales) {
      byMedication[sale.medicationId] = (byMedication[sale.medicationId] || 0) + sale.quantity
      const dateKey = sale.soldAt.toISOString().split('T')[0]
      daily[dateKey] = (daily[dateKey] || 0) + sale.totalPrice
    }

    return {
      total,
      count: sales.length,
      byMedication,
      daily: Object.entries(daily).map(([date, amount]) => ({ date, amount })),
    }
  }
}