import { PartialType } from '@nestjs/mapped-types'
import { CreatePaymentDto } from './create-payment.dto'
import { IsEnum, IsOptional } from 'class-validator'
import { PaymentStatus } from '@prisma/client'

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus
}