import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ClienteDocument = Cliente & Document

@Schema()
export class Cliente {
  @Prop({ required: true, unique: true })
  username: string            

  @Prop({ required: true })
  senha: string

  @Prop({ required: true })
  nome: string

  @Prop({ required: true })
  idade: number

  @Prop({ required: true })
  renda: number
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente)
