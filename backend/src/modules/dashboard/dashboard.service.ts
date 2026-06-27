import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(date: Date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const [
      patientsJour,
      consultationsJour,
      recettesJour,
      examensRealises,
      hospitalisations,
      ventesPharmacie,
    ] = await Promise.all([
      this.prisma.patient.count({
        where: { createdAt: { gte: startOfDay, lte: endOfDay } },
      }),
      this.prisma.consultation.count({
        where: { dateConsultation: { gte: startOfDay, lte: endOfDay } },
      }),
      this.prisma.payment.aggregate({
        where: { createdAt: { gte: startOfDay, lte: endOfDay }, status: 'COMPLETED' },
        _sum: { montant: true },
      }),
      this.prisma.examRequest.count({
        where: { requestedAt: { gte: startOfDay, lte: endOfDay }, status: 'COMPLETED' },
      }),
      this.prisma.hospitalization.count({
        where: { status: 'ACTIVE' },
      }),
      this.prisma.sale.aggregate({
        where: { soldAt: { gte: startOfDay, lte: endOfDay } },
        _sum: { totalPrice: true },
      }),
    ])

    return {
      patientsJour,
      consultationsJour,
      recettesJour: recettesJour._sum.montant || 0,
      examensRealises,
      hospitalisations,
      ventesPharmacie: ventesPharmacie._sum.totalPrice || 0,
    }
  }

  async getRecentActivities(limit: number) {
    const [consultations, payments, patients] = await Promise.all([
      this.prisma.consultation.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { nom: true, prenom: true } },
          medecin: { select: { firstName: true, lastName: true } },
        },
      }),
      this.prisma.payment.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { nom: true, prenom: true } },
          collector: { select: { firstName: true, lastName: true } },
        },
      }),
      this.prisma.patient.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: { select: { firstName: true, lastName: true } },
        },
      }),
    ])

    const activities = [
      ...consultations.map(c => ({
        type: 'consultation',
        action: 'Nouvelle consultation',
        patient: `${c.patient.nom} ${c.patient.prenom}`,
        user: `${c.medecin.firstName} ${c.medecin.lastName}`,
        time: c.createdAt,
      })),
      ...payments.map(p => ({
        type: 'payment',
        action: `Paiement de ${p.montant.toLocaleString()} FC`,
        patient: `${p.patient.nom} ${p.patient.prenom}`,
        user: `${p.collector.firstName} ${p.collector.lastName}`,
        time: p.createdAt,
      })),
      ...patients.map(p => ({
        type: 'patient',
        action: 'Nouveau patient enregistré',
        patient: `${p.nom} ${p.prenom}`,
        user: `${p.creator.firstName} ${p.creator.lastName}`,
        time: p.createdAt,
      })),
    ]

    return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, limit)
  }

  async getPatientsTimeline(days: number) {
    const timeline = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const count = await this.prisma.patient.count({
        where: {
          createdAt: { gte: date, lt: nextDate },
        },
      })

      timeline.push({
        date: date.toISOString().split('T')[0],
        count,
      })
    }
    return timeline
  }

  async getRevenueTimeline(days: number) {
    const timeline = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const result = await this.prisma.payment.aggregate({
        where: {
          createdAt: { gte: date, lt: nextDate },
          status: 'COMPLETED',
        },
        _sum: { montant: true },
      })

      timeline.push({
        date: date.toISOString().split('T')[0],
        amount: result._sum.montant || 0,
      })
    }
    return timeline
  }

  async getConsultationsStats(startDate?: Date, endDate?: Date) {
    const where: any = {}
    if (startDate || endDate) {
      where.dateConsultation = {}
      if (startDate) where.dateConsultation.gte = startDate
      if (endDate) where.dateConsultation.lte = endDate
    }

    const [total, byMedecin, byStatus] = await Promise.all([
      this.prisma.consultation.count({ where }),
      this.prisma.consultation.groupBy({
        by: ['medecinId'],
        where,
        _count: true,
      }),
      this.prisma.consultation.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
    ])

    return { total, byMedecin, byStatus }
  }

  async getHospitalizationStats() {
    const [active, available] = await Promise.all([
      this.prisma.hospitalization.count({ where: { status: 'ACTIVE' } }),
      this.prisma.hospitalization.count({ where: { status: 'DISCHARGED' } }),
    ])

    return {
      active,
      discharged: available,
      occupancyRate: active + available > 0 ? (active / (active + available)) * 100 : 0,
    }
  }

  async getAlerts() {
    const [lowStock, expiring, waitingConsultations] = await Promise.all([
      this.prisma.medication.findMany({
        where: {
          stock: { lte: this.prisma.medication.fields.threshold },
        },
        select: { name: true, stock: true, threshold: true },
      }),
      this.prisma.medication.findMany({
        where: {
          expiryDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        },
        select: { name: true, expiryDate: true },
      }),
      this.prisma.consultation.count({
        where: { status: 'EN_ATTENTE' },
      }),
    ])

    return {
      lowStock,
      expiring,
      waitingConsultations,
    }
  }
}