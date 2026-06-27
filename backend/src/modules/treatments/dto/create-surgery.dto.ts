import { IsString, IsDateString, IsOptional } from 'class-validator'

export class CreateSurgeryDto {
  @IsString()
  patientId: string

  @IsString()
  type: string

  @IsDateString()
  scheduledDate: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  status?: string
}