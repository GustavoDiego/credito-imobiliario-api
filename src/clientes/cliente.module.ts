import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ClientesService } from './cliente.service'
import { ClientesController } from './cliente.controller'
import { Cliente, ClienteSchema } from './schemas/cliente.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
