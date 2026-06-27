import { IsString, IsOptional, IsEnum } from 'class-validator'

export class RequestExamDto {
  @IsString()
  patientId: string

  @IsOptional()
  @IsString()
  consultationId?: string

  @IsString()
  type: string

  @IsOptional()
  @IsString()
  description?: string
}