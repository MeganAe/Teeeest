import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuditService } from './audit.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '@prisma/client'

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query() query: any) {
    return this.auditService.findAll(query)
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN)
  async getByUser(@Param('userId') userId: string, @Query() query: any) {
    return this.auditService.getByUser(userId, query)
  }

  @Get('entity/:entity/:entityId')
  @Roles(Role.ADMIN)
  async getByEntity(@Param('entity') entity: string, @Param('entityId') entityId: string) {
    return this.auditService.getByEntity(entity, entityId)
  }

  @Get('stats')
  @Roles(Role.ADMIN)
  async getStats(@Query('days') days?: string) {
    return this.auditService.getStats(days ? parseInt(days) : 30)
  }

  @Get('export')
  @Roles(Role.ADMIN)
  async export(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.auditService.export(new Date(startDate), new Date(endDate))
  }
}