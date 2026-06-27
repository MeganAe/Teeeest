import { IsOptional, IsString, IsEnum } from 'class-validator'
import { HandicapType } from '@prisma/client'

export class SearchPatientDto {
  @IsString()
  q: string

  @IsOptional()
  @IsEnum(HandicapType)
  type?: HandicapType
}