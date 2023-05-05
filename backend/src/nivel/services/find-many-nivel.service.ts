import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './../entities/nivel.entity';

@Injectable()
export class FindManyNivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async findAll(): Promise<Nivel[]> {
    return this.nivelRepository.find();
  }
}
