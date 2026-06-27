import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ConsultationsService } from './consultations.service'
import { CreateConsultationDto } from './dto/create-consultation.dto'
import { UpdateConsultationDto } from './dto/update-consultation.dto'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async findAll(@Query() query: any) {
    return this.consultationsService.findAll(query)
  }

  @Get('waiting-queue')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async getWaitingQueue() {
    return this.consultationsService.getWaitingQueue()
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async getByPatient(@Param('patientId') patientId: string) {
    return this.consultationsService.getByPatient(patientId)
  }

  @Get('today')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async getToday(@CurrentUser('id') medecinId: string) {
    return this.consultationsService.getToday(medecinId)
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async findById(@Param('id') id: string) {
    return this.consultationsService.findById(id)
  }

  @Post()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async create(@Body() createConsultationDto: CreateConsultationDto, @CurrentUser('id') medecinId: string) {
    return this.consultationsService.create(createConsultationDto, medecinId)
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async update(@Param('id') id: string, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationsService.update(id, updateConsultationDto)
  }

  @Put(':id/status')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.consultationsService.updateStatus(id, status)
  }

  @Post(':id/prescriptions')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async addPrescription(@Param('id') id: string, @Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.consultationsService.addPrescription(id, createPrescriptionDto)
  }

  @Get(':id/prescriptions')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN, Role.PHARMACIEN)
  async getPrescriptions(@Param('id') id: string) {
    return this.consultationsService.getPrescriptions(id)
  }

  @Get(':id/report')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async generateReport(@Param('id') id: string) {
    return this.consultationsService.generateReport(id)
  }
}