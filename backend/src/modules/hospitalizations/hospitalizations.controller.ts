import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common'
import { HospitalizationsService } from './hospitalizations.service'
import { CreateHospitalizationDto } from './dto/create-hospitalization.dto'
import { UpdateHospitalizationDto } from './dto/update-hospitalization.dto'
import { AddDailyFollowupDto } from './dto/add-daily-followup.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('hospitalizations')
export class HospitalizationsController {
  constructor(private readonly hospitalizationsService: HospitalizationsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async findAll(@Query() query: any) {
    return this.hospitalizationsService.findAll(query)
  }

  @Get('active')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async getActive() {
    return this.hospitalizationsService.getActive()
  }

  @Get('beds')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async getBedOccupancy() {
    return this.hospitalizationsService.getBedOccupancy()
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async getByPatient(@Param('patientId') patientId: string) {
    return this.hospitalizationsService.getByPatient(patientId)
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async findById(@Param('id') id: string) {
    return this.hospitalizationsService.findById(id)
  }

  @Post()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async create(@Body() createHospitalizationDto: CreateHospitalizationDto) {
    return this.hospitalizationsService.create(createHospitalizationDto)
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async update(@Param('id') id: string, @Body() updateHospitalizationDto: UpdateHospitalizationDto) {
    return this.hospitalizationsService.update(id, updateHospitalizationDto)
  }

  @Post(':id/discharge')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async discharge(@Param('id') id: string, @Body('dischargeSummary') dischargeSummary: string) {
    return this.hospitalizationsService.discharge(id, dischargeSummary)
  }

  @Post(':id/daily-followup')
  @Roles(Role.ADMIN, Role.INFIRMIER)
  async addDailyFollowup(
    @Param('id') id: string,
    @Body() addDailyFollowupDto: AddDailyFollowupDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.hospitalizationsService.addDailyFollowup(id, addDailyFollowupDto, userId)
  }

  @Get(':id/daily-followups')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.INFIRMIER)
  async getDailyFollowups(@Param('id') id: string) {
    return this.hospitalizationsService.getDailyFollowups(id)
  }
}