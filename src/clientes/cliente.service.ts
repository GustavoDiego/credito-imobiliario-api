import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { Cliente, ClienteDocument } from './schemas/cliente.schema'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@Injectable()
export class ClientesService {
  constructor(@InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { username, senha } = createClienteDto

    const usernameExists = await this.clienteModel.findOne({ username })
    if (usernameExists) {
      throw new ConflictException('Nome de usuário já está em uso')
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    const clienteCriado = new this.clienteModel({
      ...createClienteDto,
      senha: hashedPassword,
    })

    return clienteCriado.save()
  }

  async findAll(
    filtros: Partial<{ nome: string; idade: number; renda: number }>,
  ): Promise<Cliente[]> {
    const query: any = {}

    if (filtros.nome) {
      query.nome = { $regex: new RegExp(filtros.nome, 'i') } 
    }

    if (filtros.idade !== undefined) {
      query.idade = filtros.idade
    }

    if (filtros.renda !== undefined) {
      query.renda = filtros.renda
    }

    return this.clienteModel.find(query).select('-senha')
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).select('-senha')
    if (!cliente) throw new NotFoundException('Cliente não encontrado')
    return cliente
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    if (updateClienteDto.senha) {
      updateClienteDto.senha = await bcrypt.hash(updateClienteDto.senha, 10)
    }

    const clienteAtualizado = await this.clienteModel
      .findByIdAndUpdate(id, updateClienteDto, { new: true })
      .select('-senha')

    if (!clienteAtualizado) throw new NotFoundException('Cliente não encontrado')
    return clienteAtualizado
  }

  async remove(id: string): Promise<void> {
    const result = await this.clienteModel.findByIdAndDelete(id)
    if (!result) throw new NotFoundException('Cliente não encontrado')
  }
}
