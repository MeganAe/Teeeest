import { IsString, IsEnum, IsOptional, IsDateString, IsPhoneNumber } from 'class-validator'
import { Sexe, HandicapType } from '@prisma/client'

export class CreatePatientDto {
  @IsString()
  nom: string

  @IsOptional()
  @IsString()
  postnom?: string

  @IsString()
  prenom: string

  @IsEnum(Sexe)
  sexe: Sexe

  @IsDateString()
  dateNaissance: string

  @IsOptional()
  @IsPhoneNumber()
  telephone?: string

  @IsOptional()
  @IsString()
  adresse?: string

  @IsOptional()
  @IsString()
  contactUrgence?: string

  @IsEnum(HandicapType)
  typeHandicap: HandicapType
}