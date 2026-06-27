import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import * as ExcelJS from 'exceljs'
import * as PDFDocument from 'pdfkit'

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getFinancialReport(startDate: Date, endDate: Date) {
    const [payments, consultations, hospitalizations, pharmacy] = await Promise.all([
      this.prisma.payment.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          status: 'COMPLETED',
        },
      }),
      this.prisma.consultation.count({
        where: { dateConsultation: { gte: startDate, lte: endDate } },
      }),
      this.prisma.hospitalization.count({
        where: { dateAdmission: { gte: startDate, lte: endDate } },
      }),
      this.prisma.sale.aggregate({
        where: { soldAt: { gte: startDate, lte: endDate } },
        _sum: { totalPrice: true },
      }),
    ])

    const totalRevenue = payments.reduce((sum, p) => sum + p.montant, 0)
    const byType = {}
    const byMethod = {}

    for (const payment of payments) {
      byType[payment.type] = (byType[payment.type] || 0) + payment.montant
      byMethod[payment.modePaiement] = (byMethod[payment.modePaiement] || 0) + payment.montant
    }

    return {
      period: { startDate, endDate },
      summary: {
        totalRevenue,
        totalTransactions: payments.length,
        totalConsultations: consultations,
        totalHospitalizations: hospitalizations,
        pharmacyRevenue: pharmacy._sum.totalPrice || 0,
      },
      breakdown: { byType, byMethod },
      payments,
    }
  }

  async getMedicalReport(startDate: Date, endDate: Date) {
    const [consultations, exams, hospitalizations, prescriptions] = await Promise.all([
      this.prisma.consultation.findMany({
        where: { dateConsultation: { gte: startDate, lte: endDate } },
        include: { patient: true, medecin: true },
      }),
      this.prisma.examRequest.findMany({
        where: { requestedAt: { gte: startDate, lte: endDate } },
        include: { patient: true, examResult: true },
      }),
      this.prisma.hospitalization.findMany({
        where: { dateAdmission: { gte: startDate, lte: endDate } },
        include: { patient: true },
      }),
      this.prisma.prescription.findMany({
        where: { createdAt: { gte: startDate, lte: endDate } },
      }),
    ])

    const topDiagnostics = {}
    for (const consultation of consultations) {
      if (consultation.diagnostic) {
        topDiagnostics[consultation.diagnostic] = (topDiagnostics[consultation.diagnostic] || 0) + 1
      }
    }

    return {
      period: { startDate, endDate },
      consultations: {
        total: consultations.length,
        byMedecin: consultations.reduce((acc, c) => {
          const key = `${c.medecin.firstName} ${c.medecin.lastName}`
          acc[key] = (acc[key] || 0) + 1
          return acc
        }, {}),
        topDiagnostics: Object.entries(topDiagnostics).sort((a, b) => b[1] - a[1]).slice(0, 10),
      },
      exams: {
        total: exams.length,
        completed: exams.filter(e => e.status === 'COMPLETED').length,
        byType: exams.reduce((acc, e) => { acc[e.type] = (acc[e.type] || 0) + 1; return acc }, {}),
      },
      hospitalizations: { total: hospitalizations.length },
      prescriptions: { total: prescriptions.length },
    }
  }

  async getActivityReport(startDate: Date, endDate: Date) {
    const timeline = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const nextDate = new Date(currentDate)
      nextDate.setDate(nextDate.getDate() + 1)

      const [patients, consultations, payments] = await Promise.all([
        this.prisma.patient.count({ where: { createdAt: { gte: currentDate, lt: nextDate } } }),
        this.prisma.consultation.count({ where: { dateConsultation: { gte: currentDate, lt: nextDate } } }),
        this.prisma.payment.aggregate({
          where: { createdAt: { gte: currentDate, lt: nextDate }, status: 'COMPLETED' },
          _sum: { montant: true },
        }),
      ])

      timeline.push({
        date: currentDate.toISOString().split('T')[0],
        patients,
        consultations,
        revenue: payments._sum.montant || 0,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return { period: { startDate, endDate }, timeline }
  }

  async getPharmacyReport(startDate: Date, endDate: Date) {
    const [sales, lowStock, expiring] = await Promise.all([
      this.prisma.sale.findMany({
        where: { soldAt: { gte: startDate, lte: endDate } },
        include: { medication: true },
      }),
      this.prisma.medication.findMany({
        where: { stock: { lte: this.prisma.medication.fields.threshold } },
      }),
      this.prisma.medication.findMany({
        where: { expiryDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } },
      }),
    ])

    const totalRevenue = sales.reduce((sum, s) => sum + s.totalPrice, 0)
    const totalQuantity = sales.reduce((sum, s) => sum + s.quantity, 0)

    return {
      period: { startDate, endDate },
      summary: { totalRevenue, totalSales: sales.length, totalQuantity, averagePerSale: totalRevenue / (sales.length || 1) },
      lowStock: lowStock.map(m => ({ name: m.name, stock: m.stock, threshold: m.threshold })),
      expiring: expiring.map(m => ({ name: m.name, expiryDate: m.expiryDate })),
    }
  }

  async generatePDF(data: any): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = []
      const doc = new PDFDocument({ margin: 50, size: 'A4' })
      doc.on('data', chunks.push.bind(chunks))
      doc.on('end', () => resolve(Buffer.concat(chunks)))

      doc.fontSize(20).text('AMKA Medical Center', { align: 'center' })
      doc.fontSize(14).text('Rapport d\'activité', { align: 'center' })
      doc.moveDown()
      doc.fontSize(10).text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' })
      doc.moveDown()

      if (data.summary) {
        doc.fontSize(14).text('Résumé', { underline: true })
        doc.moveDown(0.5)
        doc.fontSize(10)
        Object.entries(data.summary).forEach(([key, value]) => { doc.text(`${key}: ${value}`) })
        doc.moveDown()
      }
      doc.end()
    })
  }

  async generateExcel(data: any): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Rapport')
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Type', key: 'type', width: 20 },
      { header: 'Description', key: 'description', width: 40 },
      { header: 'Montant', key: 'montant', width: 15 },
    ]
    if (data.payments) {
      data.payments.forEach((payment: any) => {
        worksheet.addRow({
          date: new Date(payment.createdAt).toLocaleDateString('fr-FR'),
          type: payment.type,
          description: `Paiement patient ${payment.patient?.nom} ${payment.patient?.prenom}`,
          montant: payment.montant,
        })
      })
    }
    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}