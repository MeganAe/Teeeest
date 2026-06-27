import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '@prisma/client'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR, Role.COMPTABLE)
  async getStats(@Query('date') date?: string) {
    return this.dashboardService.getStats(date ? new Date(date) : new Date())
  }

  @Get('recent-activities')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getRecentActivities(@Query('limit') limit?: string) {
    return this.dashboardService.getRecentActivities(limit ? parseInt(limit) : 10)
  }

  @Get('patients-timeline')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getPatientsTimeline(@Query('days') days?: string) {
    return this.dashboardService.getPatientsTimeline(days ? parseInt(days) : 30)
  }

  @Get('revenue-timeline')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getRevenueTimeline(@Query('days') days?: string) {
    return this.dashboardService.getRevenueTimeline(days ? parseInt(days) : 30)
  }

  @Get('consultations-stats')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getConsultationsStats(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.dashboardService.getConsultationsStats(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }

  @Get('hospitalization-stats')
  @Roles(Role.ADMIN, Role.MEDECIN_DIRECTEUR)
  async getHospitalizationStats() {
    return this.dashboardService.getHospitalizationStats()
  }

  @Get('alerts')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async getAlerts() {
    return this.dashboardService.getAlerts()
  }
}