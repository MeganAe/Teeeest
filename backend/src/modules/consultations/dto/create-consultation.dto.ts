import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator'

export class CreateConsultationDto {
  @IsString()
  patientId: string

  @IsString()
  motif: string

  @IsOptional()
  @IsString()
  diagnostic?: string

  @IsOptional()
  @IsString()
  tension?: string

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(45)
  temperature?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(300)
  poids?: number

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(250)
  taille?: number

  @IsOptional()
  @IsString()
  traitement?: string

  @IsOptional()
  @IsString()
  notes?: string
}