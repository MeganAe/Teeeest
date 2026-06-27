import { IsString, IsNumber, IsDateString, Min } from 'class-validator'

export class CreateExpenseDto {
  @IsString()
  description: string

  @IsNumber()
  @Min(0)
  amount: number

  @IsString()
  category: string

  @IsString()
  account: string

  @IsDateString()
  date: string
}