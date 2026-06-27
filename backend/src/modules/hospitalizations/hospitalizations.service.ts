import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateHospitalizationDto } from './dto/create-hospitalization.dto'
import { UpdateHospitalizationDto } from './dto/update-hospitalization.dto'
import { AddDailyFollowupDto } from './dto/add-daily-followup.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class HospitalizationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, limit = 10, status, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: Prisma.HospitalizationWhereInput = {}
    if (status) where.status = status
    if (startDate || endDate) {
      where.dateAdmission = {}
      if (startDate) where.dateAdmission.gte = new Date(startDate)
      if (endDate) where.dateAdmission.lte = new Date(endDate)
    }

    const [hospitalizations, total] = await Promise.all([
      this.prisma.hospitalization.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { dateAdmission: 'desc' },
        include: {
          patient: {
            select: { id: true, nom: true, prenom: true, numeroDossier: true },
          },
          dailyFollowups: {
            orderBy: { date: 'desc' },
            take: 5,
          },
        },
      }),
      this.prisma.hospitalization.count({ where }),
    ])

    return {
      hospitalizations,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getActive() {
    return this.prisma.hospitalization.findMany({
      where: { status: 'ACTIVE' },
      include: {
        patient: {
          select: { id: true, nom: true, prenom: true, numeroDossier: true, telephone: true },
        },
      },
      orderBy: { dateAdmission: 'asc' },
    })
  }

  async getBedOccupancy() {
    const totalBeds = 50 // Configuration - à mettre en base de données
    const activeHospitalizations = await this.prisma.hospitalization.count({
      where: { status: 'ACTIVE' },
    })

    const beds = []
    for (let i = 1; i <= totalBeds; i++) {
      const bedNumber = `LIT-${i.toString().padStart(3, '0')}`
      const hospitalization = await this.prisma.hospitalization.findFirst({
        where: { litNumber: bedNumber, status: 'ACTIVE' },
        include: {
          patient: {
            select: { nom: true, prenom: true },
          },
        },
      })

      beds.push({
        number: bedNumber,
        isOccupied: !!hospitalization,
        patient: hospitalization?.patient || null,
        hospitalizationId: hospitalization?.id || null,
      })
    }

    return {
      totalBeds,
      occupied: activeHospitalizations,
      available: totalBeds - activeHospitalizations,
      occupancyRate: (activeHospitalizations / totalBeds) * 100,
      beds,
    }
  }

  async getByPatient(patientId: string) {
    return this.prisma.hospitalization.findMany({
      where: { patientId },
      orderBy: { dateAdmission: 'desc' },
      include: {
        dailyFollowups: {
          orderBy: { date: 'desc' },
        },
      },
    })
  }

  async findById(id: string) {
    const hospitalization = await this.prisma.hospitalization.findUnique({
      where: { id },
      include: {
        patient: true,
        dailyFollowups: {
          orderBy: { date: 'desc' },
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
      },
    })

    if (!hospitalization) {
      throw new NotFoundException(`Hospitalisation avec ID ${id} non trouvée`)
    }

    return hospitalization
  }

  async create(createHospitalizationDto: CreateHospitalizationDto) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: createHospitalizationDto.patientId },
    })
    if (!patient) {
      throw new NotFoundException('Patient non trouvé')
    }

    // Vérifier si le patient a déjà une hospitalisation active
    const activeHospitalization = await this.prisma.hospitalization.findFirst({
      where: {
        patientId: createHospitalizationDto.patientId,
        status: 'ACTIVE',
      },
    })

    if (activeHospitalization) {
      throw new BadRequestException('Ce patient a déjà une hospitalisation active')
    }

    // Vérifier si le lit est disponible
    const bedOccupied = await this.prisma.hospitalization.findFirst({
      where: {
        litNumber: createHospitalizationDto.litNumber,
        status: 'ACTIVE',
      },
    })

    if (bedOccupied) {
      throw new BadRequestException(`Le lit ${createHospitalizationDto.litNumber} est déjà occupé`)
    }

    return this.prisma.hospitalization.create({
      data: {
        patientId: createHospitalizationDto.patientId,
        litNumber: createHospitalizationDto.litNumber,
        diagnostic: createHospitalizationDto.diagnostic,
        status: 'ACTIVE',
      },
      include: {
        patient: true,
      },
    })
  }

  async update(id: string, updateHospitalizationDto: UpdateHospitalizationDto) {
    await this.findById(id)

    return this.prisma.hospitalization.update({
      where: { id },
      data: {
        diagnostic: updateHospitalizationDto.diagnostic,
      },
    })
  }

  async discharge(id: string, dischargeSummary: string) {
    const hospitalization = await this.findById(id)

    if (hospitalization.status !== 'ACTIVE') {
      throw new BadRequestException('Cette hospitalisation n\'est pas active')
    }

    return this.prisma.hospitalization.update({
      where: { id },
      data: {
        dateSortie: new Date(),
        status: 'DISCHARGED',
      },
    })
  }

  async addDailyFollowup(id: string, addDailyFollowupDto: AddDailyFollowupDto, userId: string) {
    await this.findById(id)

    return this.prisma.dailyFollowup.create({
      data: {
        hospitalizationId: id,
        temperature: addDailyFollowupDto.temperature,
        tension: addDailyFollowupDto.tension,
        poids: addDailyFollowupDto.poids,
        observations: addDailyFollowupDto.observations,
        treatment: addDailyFollowupDto.treatment,
        createdBy: userId,
      },
    })
  }

  async getDailyFollowups(id: string) {
    await this.findById(id)

    return this.prisma.dailyFollowup.findMany({
      where: { hospitalizationId: id },
      orderBy: { date: 'desc' },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    })
  }
}