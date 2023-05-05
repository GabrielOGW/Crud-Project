import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './../entities/nivel.entity';

@Injectable()
export class FindNivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async findOne(id: number): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });
    if (!nivel) {
      throw new Error(`Nivel with id ${id} not found.`);
    }
    return nivel;
  }
}
