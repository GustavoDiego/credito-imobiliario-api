import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ModalidadeDocument = Modalidade & Document

@Schema()
export class Modalidade {
  @Prop({ required: true, unique: true })
  tipo: string 

  @Prop()
  taxa?: number 

  @Prop()
  prazo: number 

  @Prop()
  idadeMin?: number

  @Prop()
  idadeMax?: number

  @Prop()
  rendaMin?: number

  @Prop()
  rendaMax?: number

  @Prop({ default: true })
  ativo: boolean
}

export const ModalidadeSchema = SchemaFactory.createForClass(Modalidade)
