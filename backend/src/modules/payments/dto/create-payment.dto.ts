import { IsString, IsNumber, IsEnum, Min } from 'class-validator'
import { PaymentMethod } from '@prisma/client'

export class CreatePaymentDto {
  @IsString()
  patientId: string

  @IsNumber()
  @Min(0)
  montant: number

  @IsString()
  type: string

  @IsEnum(PaymentMethod)
  modePaiement: PaymentMethod
}