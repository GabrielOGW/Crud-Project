import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './../entities/nivel.entity';

@Injectable()
export class DeleteNivelService {
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async remove(id: number): Promise<void> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });
    if (!nivel) {
      throw new Error(`Nivel with id ${id} not found.`);
    }
    if (nivel.devs.length > 0) {
      throw new Error(`Nivel with id ${id} has associated Devs.`);
    }
    await this.nivelRepository.delete(id);
  }
}
