import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max, MinLength } from 'class-validator'

export class CreateModalidadeDto {
  @IsString()
  @MinLength(3)
  tipo: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  taxa?: number

  @IsNumber()
  @Min(1)
  @Max(100)
  prazo: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  idadeMin?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  idadeMax?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  rendaMin?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  rendaMax?: number

  @IsOptional()
  @IsBoolean()
  ativo?: boolean
}
