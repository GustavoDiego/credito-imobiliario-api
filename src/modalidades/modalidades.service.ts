import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Modalidade, ModalidadeDocument } from './schemas/modalidades.schema'
import { CreateModalidadeDto } from './dto/create-modalidades.dto'
import { UpdateModalidadeDto } from './dto/update-modalidades.dto'

@Injectable()
export class ModalidadesService {
  constructor(
    @InjectModel(Modalidade.name)
    private readonly modalidadeModel: Model<ModalidadeDocument>,
  ) {}

  async create(dto: CreateModalidadeDto): Promise<Modalidade> {
    const existe = await this.modalidadeModel.findOne({ tipo: dto.tipo })
    if (existe) throw new ConflictException('Tipo de modalidade já existe')

    const modalidade = new this.modalidadeModel(dto)
    return modalidade.save()
  }

  async findAll(filtros: {
    idade?: number
    renda?: number
    ativo?: boolean
  }): Promise<Modalidade[]> {
    const query: any = {}

    if (filtros.idade !== undefined) {
      query.$and = query.$and || []
      query.$and.push({
        $or: [{ idadeMin: { $lte: filtros.idade } }, { idadeMin: { $exists: false } }],
      })
      query.$and.push({
        $or: [{ idadeMax: { $gte: filtros.idade } }, { idadeMax: { $exists: false } }],
      })
    }

    if (filtros.renda !== undefined) {
      query.$and = query.$and || []
      query.$and.push({
        $or: [{ rendaMin: { $lte: filtros.renda } }, { rendaMin: { $exists: false } }],
      })
      query.$and.push({
        $or: [{ rendaMax: { $gte: filtros.renda } }, { rendaMax: { $exists: false } }],
      })
    }

    if (filtros.ativo !== undefined) {
      query.ativo = filtros.ativo
    }

    return this.modalidadeModel.find(query)
  }

  async findOne(id: string): Promise<Modalidade> {
    const modalidade = await this.modalidadeModel.findById(id)
    if (!modalidade) throw new NotFoundException('Modalidade não encontrada')
    return modalidade
  }

  async update(id: string, dto: UpdateModalidadeDto): Promise<Modalidade> {
    const modalidade = await this.modalidadeModel.findByIdAndUpdate(id, dto, {
      new: true,
    })
    if (!modalidade) throw new NotFoundException('Modalidade não encontrada')
    return modalidade
  }

  async desativar(id: string): Promise<Modalidade> {
    const modalidade = await this.modalidadeModel.findByIdAndUpdate(
      id,
      { ativo: false },
      { new: true },
    )
    if (!modalidade) throw new NotFoundException('Modalidade não encontrada')
    return modalidade
  }

  async reativar(id: string): Promise<Modalidade> {
    const modalidade = await this.modalidadeModel.findByIdAndUpdate(
      id,
      { ativo: true },
      { new: true },
    )
    if (!modalidade) throw new NotFoundException('Modalidade não encontrada')
    return modalidade
  }
}
