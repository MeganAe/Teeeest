import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateKineSessionDto } from './dto/create-kine-session.dto'
import { CreateSurgeryDto } from './dto/create-surgery.dto'
import { CreateNursingCareDto } from './dto/create-nursing-care.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  // ==================== KINÉSITHÉRAPIE ====================
  async getAllKineSessions(query: any) {
    const { page = 1, limit = 10, patientId, status } = query
    const skip = (page - 1) * limit

    const where: any = {}
    if (patientId) where.patientId = patientId
    if (status) where.status = status

    const [sessions, total] = await Promise.all([
      this.prisma.kineSession.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
          therapist: { select: { id: true, firstName: true, lastName: true } },
        },
      }),
      this.prisma.kineSession.count({ where }),
    ])

    return { sessions, total, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }

  async getKineSessionsByPatient(patientId: string) {
    return this.prisma.kineSession.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
      include: { therapist: { select: { id: true, firstName: true, lastName: true } } },
    })
  }

  async createKineSession(dto: CreateKineSessionDto, userId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } })
    if (!patient) throw new NotFoundException('Patient non trouvé')

    return this.prisma.kineSession.create({
      data: {
        patientId: dto.patientId,
        date: new Date(dto.date),
        duration: dto.duration,
        exercises: dto.exercises,
        observations: dto.observations,
        status: dto.status || 'PLANIFIE',
        createdBy: userId,
      },
      include: { patient: true, therapist: true },
    })
  }

  async updateKineSession(id: string, dto: any) {
    const session = await this.prisma.kineSession.findUnique({ where: { id } })
    if (!session) throw new NotFoundException('Session non trouvée')

    return this.prisma.kineSession.update({ where: { id }, data: dto })
  }

  // ==================== CHIRURGIE ====================
  async getAllSurgeries(query: any) {
    const { page = 1, limit = 10, patientId, status } = query
    const skip = (page - 1) * limit

    const where: any = {}
    if (patientId) where.patientId = patientId
    if (status) where.status = status

    const [surgeries, total] = await Promise.all([
      this.prisma.surgery.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { scheduledDate: 'desc' },
        include: {
          patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
          surgeon: { select: { id: true, firstName: true, lastName: true } },
        },
      }),
      this.prisma.surgery.count({ where }),
    ])

    return { surgeries, total, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }

  async getSurgeriesByPatient(patientId: string) {
    return this.prisma.surgery.findMany({
      where: { patientId },
      orderBy: { scheduledDate: 'desc' },
      include: { surgeon: { select: { id: true, firstName: true, lastName: true } } },
    })
  }

  async createSurgery(dto: CreateSurgeryDto, userId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } })
    if (!patient) throw new NotFoundException('Patient non trouvé')

    return this.prisma.surgery.create({
      data: {
        patientId: dto.patientId,
        type: dto.type,
        scheduledDate: new Date(dto.scheduledDate),
        description: dto.description,
        status: dto.status || 'PLANIFIE',
        surgeonId: userId,
        createdBy: userId,
      },
      include: { patient: true, surgeon: true },
    })
  }

  async updateSurgery(id: string, dto: any) {
    const surgery = await this.prisma.surgery.findUnique({ where: { id } })
    if (!surgery) throw new NotFoundException('Chirurgie non trouvée')
    return this.prisma.surgery.update({ where: { id }, data: dto })
  }

  // ==================== SOINS INFIRMIERS ====================
  async getAllNursingCares(query: any) {
    const { page = 1, limit = 10, patientId, type } = query
    const skip = (page - 1) * limit

    const where: any = {}
    if (patientId) where.patientId = patientId
    if (type) where.type = type

    const [cares, total] = await Promise.all([
      this.prisma.nursingCare.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
          nurse: { select: { id: true, firstName: true, lastName: true } },
        },
      }),
      this.prisma.nursingCare.count({ where }),
    ])

    return { cares, total, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }

  async getNursingCaresByPatient(patientId: string) {
    return this.prisma.nursingCare.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: { nurse: { select: { id: true, firstName: true, lastName: true } } },
    })
  }

  async createNursingCare(dto: CreateNursingCareDto, userId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } })
    if (!patient) throw new NotFoundException('Patient non trouvé')

    return this.prisma.nursingCare.create({
      data: {
        patientId: dto.patientId,
        type: dto.type,
        description: dto.description,
        products: dto.products,
        observations: dto.observations,
        nurseId: userId,
        createdBy: userId,
      },
      include: { patient: true, nurse: true },
    })
  }

  async updateNursingCare(id: string, dto: any) {
    const care = await this.prisma.nursingCare.findUnique({ where: { id } })
    if (!care) throw new NotFoundException('Soin non trouvé')
    return this.prisma.nursingCare.update({ where: { id }, data: dto })
  }
}