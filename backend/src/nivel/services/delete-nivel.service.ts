import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        `Nivel with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (nivel.devs.length > 0) {
      throw new HttpException(
        `Nivel with id ${id} has associated Devs.`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.nivelRepository.delete(id);
  }
}
