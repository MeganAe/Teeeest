import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateConsultationDto } from './dto/create-consultation.dto'
import { UpdateConsultationDto } from './dto/update-consultation.dto'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { Prisma, ConsultationStatus } from '@prisma/client'

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, limit = 10, patientId, medecinId, status, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: Prisma.ConsultationWhereInput = {}
    if (patientId) where.patientId = patientId
    if (medecinId) where.medecinId = medecinId
    if (status) where.status = status as ConsultationStatus
    if (startDate || endDate) {
      where.dateConsultation = {}
      if (startDate) where.dateConsultation.gte = new Date(startDate)
      if (endDate) where.dateConsultation.lte = new Date(endDate)
    }

    const [consultations, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { dateConsultation: 'desc' },
        include: {
          patient: {
            select: { id: true, nom: true, prenom: true, numeroDossier: true, sexe: true, dateNaissance: true },
          },
          medecin: {
            select: { id: true, firstName: true, lastName: true, role: true },
          },
          prescriptions: true,
        },
      }),
      this.prisma.consultation.count({ where }),
    ])

    return {
      consultations,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getWaitingQueue() {
    const consultations = await this.prisma.consultation.findMany({
      where: { status: 'EN_ATTENTE' },
      orderBy: { dateConsultation: 'asc' },
      include: {
        patient: {
          select: { id: true, nom: true, prenom: true, numeroDossier: true },
        },
      },
    })

    return consultations.map((c, index) => ({
      ...c,
      position: index + 1,
      estimatedWaitTime: index * 15, // 15 minutes par consultation
    }))
  }

  async getByPatient(patientId: string) {
    return this.prisma.consultation.findMany({
      where: { patientId },
      orderBy: { dateConsultation: 'desc' },
      include: {
        medecin: {
          select: { id: true, firstName: true, lastName: true },
        },
        prescriptions: true,
        examRequests: true,
      },
    })
  }

  async getToday(medecinId: string) {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    return this.prisma.consultation.findMany({
      where: {
        medecinId,
        dateConsultation: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { dateConsultation: 'asc' },
      include: {
        patient: {
          select: { id: true, nom: true, prenom: true, numeroDossier: true },
        },
      },
    })
  }

  async findById(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: {
        patient: true,
        medecin: {
          select: { id: true, firstName: true, lastName: true, role: true },
        },
        prescriptions: true,
        examRequests: {
          include: {
            examResult: true,
          },
        },
      },
    })

    if (!consultation) {
      throw new NotFoundException(`Consultation avec ID ${id} non trouvée`)
    }

    return consultation
  }

  async create(createConsultationDto: CreateConsultationDto, medecinId: string) {
    // Vérifier si le patient existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: createConsultationDto.patientId },
    })
    if (!patient) {
      throw new NotFoundException('Patient non trouvé')
    }

    return this.prisma.consultation.create({
      data: {
        patientId: createConsultationDto.patientId,
        medecinId,
        motif: createConsultationDto.motif,
        diagnostic: createConsultationDto.diagnostic,
        tension: createConsultationDto.tension,
        temperature: createConsultationDto.temperature,
        poids: createConsultationDto.poids,
        taille: createConsultationDto.taille,
        traitement: createConsultationDto.traitement,
        notes: createConsultationDto.notes,
        status: 'EN_ATTENTE',
      },
      include: {
        patient: true,
        medecin: true,
      },
    })
  }

  async update(id: string, updateConsultationDto: UpdateConsultationDto) {
    await this.findById(id)

    return this.prisma.consultation.update({
      where: { id },
      data: {
        diagnostic: updateConsultationDto.diagnostic,
        tension: updateConsultationDto.tension,
        temperature: updateConsultationDto.temperature,
        poids: updateConsultationDto.poids,
        taille: updateConsultationDto.taille,
        traitement: updateConsultationDto.traitement,
        notes: updateConsultationDto.notes,
      },
    })
  }

  async updateStatus(id: string, status: string) {
    await this.findById(id)

    return this.prisma.consultation.update({
      where: { id },
      data: { status: status as ConsultationStatus },
    })
  }

  async addPrescription(consultationId: string, createPrescriptionDto: CreatePrescriptionDto) {
    await this.findById(consultationId)

    return this.prisma.prescription.create({
      data: {
        consultationId,
        medicament: createPrescriptionDto.medicament,
        dosage: createPrescriptionDto.dosage,
        duree: createPrescriptionDto.duree,
        instructions: createPrescriptionDto.instructions,
      },
    })
  }

  async getPrescriptions(consultationId: string) {
    await this.findById(consultationId)

    return this.prisma.prescription.findMany({
      where: { consultationId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async generateReport(id: string) {
    const consultation = await this.findById(id)

    return {
      consultation,
      reportDate: new Date(),
      generatedBy: consultation.medecin,
      summary: {
        patientName: `${consultation.patient.nom} ${consultation.patient.prenom}`,
        patientDossier: consultation.patient.numeroDossier,
        consultationDate: consultation.dateConsultation,
        medecinName: `${consultation.medecin.firstName} ${consultation.medecin.lastName}`,
        diagnostic: consultation.diagnostic,
        treatment: consultation.traitement,
        prescriptions: consultation.prescriptions,
      },
    }
  }
}