import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator'
import { PaymentStatus, PaymentMethod } from '@prisma/client'

export class PaymentQueryDto {
  @IsOptional()
  @IsString()
  patientId?: string

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus

  @IsOptional()
  @IsEnum(PaymentMethod)
  modePaiement?: PaymentMethod

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsString()
  page?: string

  @IsOptional()
  @IsString()
  limit?: string
}