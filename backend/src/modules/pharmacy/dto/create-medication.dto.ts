import { IsString, IsNumber, IsOptional, Min, IsDateString } from 'class-validator'

export class CreateMedicationDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  category: string

  @IsString()
  unit: string

  @IsNumber()
  @Min(0)
  price: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  threshold?: number

  @IsOptional()
  @IsDateString()
  expiryDate?: string
}