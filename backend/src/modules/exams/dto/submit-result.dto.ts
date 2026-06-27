import { IsString } from 'class-validator'

export class SubmitResultDto {
  @IsString()
  result: string
}