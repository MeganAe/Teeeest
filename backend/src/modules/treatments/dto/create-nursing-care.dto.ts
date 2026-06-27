import { IsString, IsOptional } from 'class-validator'

export class CreateNursingCareDto {
  @IsString()
  patientId: string

  @IsString()
  type: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  products?: string

  @IsOptional()
  @IsString()
  observations?: string
}