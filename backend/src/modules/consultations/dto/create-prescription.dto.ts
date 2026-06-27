import { IsString, IsOptional } from 'class-validator'

export class CreatePrescriptionDto {
  @IsString()
  medicament: string

  @IsString()
  dosage: string

  @IsString()
  duree: string

  @IsOptional()
  @IsString()
  instructions?: string
}