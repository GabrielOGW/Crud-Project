import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Repository } from 'typeorm';
import { Nivel } from './entities/nivel.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private NivelRepository: Repository<Nivel>,
  ) {}
  create(createNivelDto: CreateNivelDto) {
    return this.NivelRepository.save(createNivelDto);
  }

  findAll(): Promise<Nivel[]> {
    return this.NivelRepository.find();
  }

  findOne(id: number): Promise<Nivel | null> {
    return this.NivelRepository.findOne({ where: { id } });
  }

  update(id: number, updateNivelDto: UpdateNivelDto) {
    return this.NivelRepository.update(id, updateNivelDto);
  }

  async remove(id: number): Promise<void> {
    await this.NivelRepository.delete(id);
  }
}