import { PartialType } from '@nestjs/mapped-types'
import { CreateModalidadeDto } from './create-modalidades.dto'

export class UpdateModalidadeDto extends PartialType(CreateModalidadeDto) {}
