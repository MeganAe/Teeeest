import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common'
import { TreatmentsService } from './treatments.service'
import { CreateKineSessionDto } from './dto/create-kine-session.dto'
import { CreateSurgeryDto } from './dto/create-surgery.dto'
import { CreateNursingCareDto } from './dto/create-nursing-care.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  // Kinésithérapie
  @Get('kinesitherapie')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_DIRECTEUR)
  async getAllKineSessions(@Query() query: any) {
    return this.treatmentsService.getAllKineSessions(query)
  }

  @Get('kinesitherapie/patient/:patientId')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_DIRECTEUR)
  async getKineSessionsByPatient(@Param('patientId') patientId: string) {
    return this.treatmentsService.getKineSessionsByPatient(patientId)
  }

  @Post('kinesitherapie')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async createKineSession(@Body() dto: CreateKineSessionDto, @CurrentUser('id') userId: string) {
    return this.treatmentsService.createKineSession(dto, userId)
  }

  @Put('kinesitherapie/:id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async updateKineSession(@Param('id') id: string, @Body() dto: any) {
    return this.treatmentsService.updateKineSession(id, dto)
  }

  // Chirurgie
  @Get('chirurgie')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getAllSurgeries(@Query() query: any) {
    return this.treatmentsService.getAllSurgeries(query)
  }

  @Get('chirurgie/patient/:patientId')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getSurgeriesByPatient(@Param('patientId') patientId: string) {
    return this.treatmentsService.getSurgeriesByPatient(patientId)
  }

  @Post('chirurgie')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async createSurgery(@Body() dto: CreateSurgeryDto, @CurrentUser('id') userId: string) {
    return this.treatmentsService.createSurgery(dto, userId)
  }

  @Put('chirurgie/:id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async updateSurgery(@Param('id') id: string, @Body() dto: any) {
    return this.treatmentsService.updateSurgery(id, dto)
  }

  // Soins infirmiers
  @Get('soins')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async getAllNursingCares(@Query() query: any) {
    return this.treatmentsService.getAllNursingCares(query)
  }

  @Get('soins/patient/:patientId')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async getNursingCaresByPatient(@Param('patientId') patientId: string) {
    return this.treatmentsService.getNursingCaresByPatient(patientId)
  }

  @Post('soins')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async createNursingCare(@Body() dto: CreateNursingCareDto, @CurrentUser('id') userId: string) {
    return this.treatmentsService.createNursingCare(dto, userId)
  }

  @Put('soins/:id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async updateNursingCare(@Param('id') id: string, @Body() dto: any) {
    return this.treatmentsService.updateNursingCare(id, dto)
  }
}