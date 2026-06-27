import { Controller, Get, Post, Put, Body, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ExamsService } from './exams.service'
import { RequestExamDto } from './dto/request-exam.dto'
import { SubmitResultDto } from './dto/submit-result.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN, Role.LABORANTIN, Role.TECHNICIEN_EEG, Role.TECHNICIEN_ECG, Role.RADIOLOGUE)
  async findAll(@Query() query: any) {
    return this.examsService.findAll(query)
  }

  @Get('pending')
  @Roles(Role.ADMIN, Role.LABORANTIN, Role.TECHNICIEN_EEG, Role.TECHNICIEN_ECG, Role.RADIOLOGUE)
  async getPending(@CurrentUser('id') userId: string, @Query('type') type?: string) {
    return this.examsService.getPending(userId, type)
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async getByPatient(@Param('patientId') patientId: string) {
    return this.examsService.getByPatient(patientId)
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN, Role.LABORANTIN, Role.TECHNICIEN_EEG, Role.TECHNICIEN_ECG, Role.RADIOLOGUE)
  async findById(@Param('id') id: string) {
    return this.examsService.findById(id)
  }

  @Post()
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.MEDECIN_PSYCHIATRE, Role.MEDECIN_ORTHOPEDIEN)
  async requestExam(@Body() requestExamDto: RequestExamDto, @CurrentUser('id') userId: string) {
    return this.examsService.requestExam(requestExamDto, userId)
  }

  @Post(':id/result')
  @Roles(Role.ADMIN, Role.LABORANTIN, Role.TECHNICIEN_EEG, Role.TECHNICIEN_ECG, Role.RADIOLOGUE)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/exams',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        callback(null, `exam-${uniqueSuffix}${extname(file.originalname)}`)
      },
    }),
  }))
  async submitResult(
    @Param('id') id: string,
    @Body() submitResultDto: SubmitResultDto,
    @CurrentUser('id') userId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.examsService.submitResult(id, submitResultDto, userId, file)
  }

  @Put(':id/validate')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async validateResult(@Param('id') id: string) {
    return this.examsService.validateResult(id)
  }

  @Get('type/:type/stats')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getStats(@Param('type') type: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.examsService.getStats(type, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined)
  }
}