import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator'

export class AddDailyFollowupDto {
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(45)
  temperature?: number

  @IsOptional()
  @IsString()
  tension?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(300)
  poids?: number

  @IsOptional()
  @IsString()
  observations?: string

  @IsOptional()
  @IsString()
  treatment?: string
}