import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { SearchPatientDto } from './dto/search-patient.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async generateNumeroDossier(): Promise<string> {
    const year = new Date().getFullYear()
    const lastPatient = await this.prisma.patient.findFirst({
      orderBy: { numeroDossier: 'desc' },
      where: { numeroDossier: { startsWith: `AMKA-${year}` } },
    })

    let sequence = 1
    if (lastPatient) {
      const lastNumber = parseInt(lastPatient.numeroDossier.split('-')[2])
      sequence = lastNumber + 1
    }

    return `AMKA-${year}-${sequence.toString().padStart(5, '0')}`
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search } = query
    const skip = (page - 1) * limit

    const where: Prisma.PatientWhereInput = {}
    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { prenom: { contains: search, mode: 'insensitive' } },
        { numeroDossier: { contains: search } },
      ]
    }

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      }),
      this.prisma.patient.count({ where }),
    ])

    return {
      patients,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async search(searchDto: SearchPatientDto) {
    const { q, type } = searchDto
    const where: Prisma.PatientWhereInput = {
      OR: [
        { nom: { contains: q, mode: 'insensitive' } },
        { prenom: { contains: q, mode: 'insensitive' } },
        { numeroDossier: { contains: q } },
        { telephone: { contains: q } },
      ],
    }

    if (type) {
      where.typeHandicap = type as any
    }

    return this.prisma.patient.findMany({
      where,
      take: 20,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findByNumeroDossier(numeroDossier: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { numeroDossier },
      include: {
        consultations: {
          orderBy: { dateConsultation: 'desc' },
          take: 10,
          include: {
            medecin: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        hospitalizations: {
          where: { status: 'ACTIVE' },
        },
      },
    })

    if (!patient) {
      throw new NotFoundException(`Patient avec dossier ${numeroDossier} non trouvé`)
    }

    return patient
  }

  async findById(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true },
        },
        consultations: {
          orderBy: { dateConsultation: 'desc' },
          take: 20,
          include: {
            medecin: {
              select: { id: true, firstName: true, lastName: true },
            },
            prescriptions: true,
          },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
        hospitalizations: {
          include: {
            dailyFollowups: true,
          },
        },
      },
    })

    if (!patient) {
      throw new NotFoundException(`Patient avec ID ${id} non trouvé`)
    }

    return patient
  }

  async getHistory(id: string) {
    const patient = await this.findById(id)
    
    const stats = {
      totalConsultations: patient.consultations.length,
      totalPayments: patient.payments.reduce((sum, p) => sum + p.montant, 0),
      totalHospitalizations: patient.hospitalizations.length,
      lastVisit: patient.consultations[0]?.dateConsultation,
    }

    return {
      patient,
      stats,
      timeline: [
        ...patient.consultations.map(c => ({ type: 'consultation', data: c, date: c.dateConsultation })),
        ...patient.payments.map(p => ({ type: 'payment', data: p, date: p.createdAt })),
        ...patient.hospitalizations.map(h => ({ type: 'hospitalization', data: h, date: h.dateAdmission })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }
  }

  async create(createPatientDto: CreatePatientDto, userId: string) {
    const numeroDossier = await this.generateNumeroDossier()

    return this.prisma.patient.create({
      data: {
        numeroDossier,
        nom: createPatientDto.nom,
        postnom: createPatientDto.postnom,
        prenom: createPatientDto.prenom,
        sexe: createPatientDto.sexe,
        dateNaissance: new Date(createPatientDto.dateNaissance),
        telephone: createPatientDto.telephone,
        adresse: createPatientDto.adresse,
        contactUrgence: createPatientDto.contactUrgence,
        typeHandicap: createPatientDto.typeHandicap,
        createdBy: userId,
      },
    })
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.findById(id)

    return this.prisma.patient.update({
      where: { id },
      data: {
        ...updatePatientDto,
        dateNaissance: updatePatientDto.dateNaissance ? new Date(updatePatientDto.dateNaissance) : undefined,
      },
    })
  }

  async delete(id: string) {
    await this.findById(id)

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
    })
  }

  async uploadPhoto(id: string, file: Express.Multer.File) {
    await this.findById(id)

    const photoUrl = `/uploads/patients/${file.filename}`
    return this.prisma.patient.update({
      where: { id },
      data: { photo: photoUrl },
    })
  }
}