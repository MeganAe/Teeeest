import { IsString } from 'class-validator'

export class CreateHospitalizationDto {
  @IsString()
  patientId: string

  @IsString()
  litNumber: string

  @IsString()
  diagnostic: string
}