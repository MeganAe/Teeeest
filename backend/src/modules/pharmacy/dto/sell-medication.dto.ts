import { IsString, IsNumber, Min, IsOptional } from 'class-validator'

export class SellMedicationDto {
  @IsString()
  medicationId: string

  @IsNumber()
  @Min(1)
  quantity: number

  @IsOptional()
  @IsString()
  patientId?: string

  @IsOptional()
  @IsString()
  prescriptionId?: string
}