import { Injectable } from '@nestjs/common';
import { Dev } from './../entities/dev.entity';
import { CreateDevDto } from './../dto/create-dev.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateDevService {
  constructor(
    @InjectRepository(Dev)
    private readonly devRepository: Repository<Dev>,
  ) {}

  async create(createDevDto: CreateDevDto): Promise<Dev> {
    const newDev = this.devRepository.create(createDevDto);
    return this.devRepository.save(newDev);
  }
}
