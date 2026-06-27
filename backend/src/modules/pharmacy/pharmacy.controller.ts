import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { PharmacyService } from './pharmacy.service'
import { CreateMedicationDto } from './dto/create-medication.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { SellMedicationDto } from './dto/sell-medication.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('medications')
  @Roles(Role.ADMIN, Role.PHARMACIEN, Role.MEDECIN_DIRECTEUR)
  async getAllMedications(@Query() query: any) {
    return this.pharmacyService.getAllMedications(query)
  }

  @Get('medications/low-stock')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async getLowStock() {
    return this.pharmacyService.getLowStock()
  }

  @Get('medications/expiring')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async getExpiring() {
    return this.pharmacyService.getExpiring()
  }

  @Get('medications/:id')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async getMedicationById(@Param('id') id: string) {
    return this.pharmacyService.getMedicationById(id)
  }

  @Post('medications')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async createMedication(@Body() createMedicationDto: CreateMedicationDto) {
    return this.pharmacyService.createMedication(createMedicationDto)
  }

  @Put('medications/:id/stock')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.pharmacyService.updateStock(id, updateStockDto)
  }

  @Delete('medications/:id')
  @Roles(Role.ADMIN)
  async deleteMedication(@Param('id') id: string) {
    return this.pharmacyService.deleteMedication(id)
  }

  @Post('sales')
  @Roles(Role.ADMIN, Role.PHARMACIEN)
  async sellMedication(@Body() sellMedicationDto: SellMedicationDto, @CurrentUser('id') userId: string) {
    return this.pharmacyService.sellMedication(sellMedicationDto, userId)
  }

  @Get('sales')
  @Roles(Role.ADMIN, Role.PHARMACIEN, Role.COMPTABLE)
  async getSales(@Query() query: any) {
    return this.pharmacyService.getSales(query)
  }

  @Get('sales/stats')
  @Roles(Role.ADMIN, Role.PHARMACIEN, Role.COMPTABLE)
  async getSalesStats(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.pharmacyService.getSalesStats(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }
}