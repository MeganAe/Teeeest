import { Controller, Get, Post, Query, Res, Body } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '@prisma/client'
import { Response } from 'express'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('financial')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getFinancialReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportsService.getFinancialReport(new Date(startDate), new Date(endDate))
  }

  @Get('medical')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getMedicalReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportsService.getMedicalReport(new Date(startDate), new Date(endDate))
  }

  @Get('activity')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getActivityReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportsService.getActivityReport(new Date(startDate), new Date(endDate))
  }

  @Get('pharmacy')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async getPharmacyReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportsService.getPharmacyReport(new Date(startDate), new Date(endDate))
  }

  @Post('export/pdf')
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.MEDECIN_DIRECTEUR)
  async exportToPDF(@Body() data: any, @Res() res: Response) {
    const pdf = await this.reportsService.generatePDF(data)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=rapport-${Date.now()}.pdf`,
    })
    res.send(pdf)
  }

  @Post('export/excel')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async exportToExcel(@Body() data: any, @Res() res: Response) {
    const buffer = await this.reportsService.generateExcel(data)
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=rapport-${Date.now()}.xlsx`,
    })
    res.send(buffer)
  }
}