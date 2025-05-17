import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { ClientesService } from './cliente.service'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto)
  }

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('idade', ParseIntPipe) idade?: number,
    @Query('renda', ParseIntPipe) renda?: number,
  ) {
    return this.clientesService.findAll({ nome, idade, renda })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id)
  }
}
