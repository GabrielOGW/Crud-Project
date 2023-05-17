import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './../entities/nivel.entity';
import { UpdateNivelDto } from './../dto/update-nivel.dto';

@Injectable()
export class UpdateNivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async update(id: number, updateNivelDto: UpdateNivelDto): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });
    if (!nivel) {
      throw new HttpException(
        `Nivel with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(nivel, updateNivelDto);
    return this.nivelRepository.save(nivel);
  }
}
