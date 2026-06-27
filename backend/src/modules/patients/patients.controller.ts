import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PatientsService } from './patients.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { SearchPatientDto } from './dto/search-patient.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async findAll(@Query() query: any) {
    return this.patientsService.findAll(query)
  }

  @Get('search')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async search(@Query() searchDto: SearchPatientDto) {
    return this.patientsService.search(searchDto)
  }

  @Get('numero/:numeroDossier')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async findByNumeroDossier(@Param('numeroDossier') numeroDossier: string) {
    return this.patientsService.findByNumeroDossier(numeroDossier)
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.MEDECIN_DIRECTEUR)
  async findById(@Param('id') id: string) {
    return this.patientsService.findById(id)
  }

  @Get(':id/history')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async getHistory(@Param('id') id: string) {
    return this.patientsService.getHistory(id)
  }

  @Post()
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async create(@Body() createPatientDto: CreatePatientDto, @CurrentUser('id') userId: string) {
    return this.patientsService.create(createPatientDto, userId)
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.patientsService.delete(id)
  }

  @Post(':id/photo')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads/patients',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        callback(null, `patient-${uniqueSuffix}${extname(file.originalname)}`)
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Seules les images sont autorisées'), false)
      }
      callback(null, true)
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.patientsService.uploadPhoto(id, file)
  }
}