import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from '../entities/nivel.entity';
import { CreateNivelDto } from '../dto/create-nivel.dto';

@Injectable()
export class CreateNivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async create(createNivelDto: CreateNivelDto): Promise<Nivel> {
    const nivel = new Nivel();
    nivel.nivel = createNivelDto.nivel;
    await this.nivelRepository.save(nivel);

    throw new HttpException('Nivel created successfully.', HttpStatus.CREATED);
  }
}
