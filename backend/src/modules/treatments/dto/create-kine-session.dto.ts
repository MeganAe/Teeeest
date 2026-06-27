import { IsString, IsDateString, IsNumber, IsOptional, Min } from 'class-validator'

export class CreateKineSessionDto {
  @IsString()
  patientId: string

  @IsDateString()
  date: string

  @IsNumber()
  @Min(1)
  duration: number

  @IsOptional()
  @IsString()
  exercises?: string

  @IsOptional()
  @IsString()
  observations?: string

  @IsOptional()
  @IsString()
  status?: string
}