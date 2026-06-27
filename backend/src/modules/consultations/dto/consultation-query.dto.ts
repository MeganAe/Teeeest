import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator'
import { ConsultationStatus } from '@prisma/client'

export class ConsultationQueryDto {
  @IsOptional()
  @IsString()
  patientId?: string

  @IsOptional()
  @IsString()
  medecinId?: string

  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus

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