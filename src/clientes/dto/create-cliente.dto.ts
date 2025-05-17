import { IsString, IsNumber, Min, Max, MinLength, MaxLength } from 'class-validator'

export class CreateClienteDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(6)
  senha: string

  @IsString()
  nome: string

  @IsNumber()
  @Min(0)
  @Max(150)
  idade: number

  @IsNumber()
  @Min(0)
  renda: number
}
