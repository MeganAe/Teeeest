import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.PERCEPTEUR)
  async findAll(@Query() query: any) {
    return this.paymentsService.findAll(query)
  }

  @Get('daily')
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.PERCEPTEUR)
  async getDailyClosure(@Query('date') date?: string) {
    return this.paymentsService.getDailyClosure(date ? new Date(date) : new Date())
  }

  @Get('stats')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getStats(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.paymentsService.getStats(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }

  @Get('receipt/:receiptNumber')
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.PERCEPTEUR)
  async getByReceiptNumber(@Param('receiptNumber') receiptNumber: string) {
    return this.paymentsService.getByReceiptNumber(receiptNumber)
  }

  @Get('patient/:patientId')
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.PERCEPTEUR)
  async getByPatient(@Param('patientId') patientId: string) {
    return this.paymentsService.getByPatient(patientId)
  }

  @Post()
  @Roles(Role.ADMIN, Role.PERCEPTEUR)
  async create(@Body() createPaymentDto: CreatePaymentDto, @CurrentUser('id') userId: string) {
    return this.paymentsService.create(createPaymentDto, userId)
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto)
  }

  @Post(':id/refund')
  @Roles(Role.ADMIN)
  async refund(@Param('id') id: string) {
    return this.paymentsService.refund(id)
  }
}