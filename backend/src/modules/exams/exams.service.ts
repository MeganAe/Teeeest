import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { RequestExamDto } from './dto/request-exam.dto'
import { SubmitResultDto } from './dto/submit-result.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, limit = 10, patientId, type, status, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: Prisma.ExamRequestWhereInput = {}
    if (patientId) where.patientId = patientId
    if (type) where.type = type
    if (status) where.status = status
    if (startDate || endDate) {
      where.requestedAt = {}
      if (startDate) where.requestedAt.gte = new Date(startDate)
      if (endDate) where.requestedAt.lte = new Date(endDate)
    }

    const [exams, total] = await Promise.all([
      this.prisma.examRequest.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { requestedAt: 'desc' },
        include: {
          patient: {
            select: { id: true, nom: true, prenom: true, numeroDossier: true },
          },
          consultation: {
            include: {
              medecin: {
                select: { id: true, firstName: true, lastName: true },
              },
            },
          },
          examResult: true,
        },
      }),
      this.prisma.examRequest.count({ where }),
    ])

    return {
      exams,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async getPending(userId: string, type?: string) {
    const where: Prisma.ExamRequestWhereInput = { status: 'EN_ATTENTE' }
    if (type) where.type = type

    return this.prisma.examRequest.findMany({
      where,
      orderBy: { requestedAt: 'asc' },
      include: {
        patient: {
          select: { id: true, nom: true, prenom: true, numeroDossier: true },
        },
        consultation: {
          include: {
            medecin: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
      },
    })
  }

  async getByPatient(patientId: string) {
    return this.prisma.examRequest.findMany({
      where: { patientId },
      orderBy: { requestedAt: 'desc' },
      include: {
        consultation: {
          include: {
            medecin: true,
          },
        },
        examResult: true,
      },
    })
  }

  async findById(id: string) {
    const exam = await this.prisma.examRequest.findUnique({
      where: { id },
      include: {
        patient: true,
        consultation: {
          include: {
            medecin: true,
          },
        },
        examResult: true,
      },
    })

    if (!exam) {
      throw new NotFoundException(`Examen avec ID ${id} non trouvé`)
    }

    return exam
  }

  async requestExam(requestExamDto: RequestExamDto, userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: requestExamDto.patientId },
    })
    if (!patient) {
      throw new NotFoundException('Patient non trouvé')
    }

    if (requestExamDto.consultationId) {
      const consultation = await this.prisma.consultation.findUnique({
        where: { id: requestExamDto.consultationId },
      })
      if (!consultation) {
        throw new NotFoundException('Consultation non trouvée')
      }
    }

    return this.prisma.examRequest.create({
      data: {
        patientId: requestExamDto.patientId,
        consultationId: requestExamDto.consultationId,
        type: requestExamDto.type,
        description: requestExamDto.description,
        requestedBy: userId,
        status: 'EN_ATTENTE',
      },
      include: {
        patient: true,
        consultation: true,
      },
    })
  }

  async submitResult(id: string, submitResultDto: SubmitResultDto, userId: string, file?: Express.Multer.File) {
    const exam = await this.findById(id)

    if (exam.status !== 'EN_ATTENTE') {
      throw new BadRequestException('Cet examen a déjà été traité')
    }

    const fileUrl = file ? `/uploads/exams/${file.filename}` : undefined

    const examResult = await this.prisma.examResult.create({
      data: {
        examRequestId: id,
        result: submitResultDto.result,
        fileUrl,
        validatedBy: userId,
      },
    })

    await this.prisma.examRequest.update({
      where: { id },
      data: { status: 'COMPLETED' },
    })

    return examResult
  }

  async validateResult(id: string) {
    const exam = await this.findById(id)

    if (exam.status !== 'COMPLETED') {
      throw new BadRequestException('Les résultats doivent être soumis avant validation')
    }

    return this.prisma.examRequest.update({
      where: { id },
      data: { status: 'VALIDATED' },
    })
  }

  async getStats(type: string, startDate?: Date, endDate?: Date) {
    const where: Prisma.ExamRequestWhereInput = { type }
    if (startDate || endDate) {
      where.requestedAt = {}
      if (startDate) where.requestedAt.gte = startDate
      if (endDate) where.requestedAt.lte = endDate
    }

    const [total, completed, validated] = await Promise.all([
      this.prisma.examRequest.count({ where }),
      this.prisma.examRequest.count({ where: { ...where, status: 'COMPLETED' } }),
      this.prisma.examRequest.count({ where: { ...where, status: 'VALIDATED' } }),
    ])

    return {
      type,
      total,
      completed,
      validated,
      pending: total - completed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    }
  }
}