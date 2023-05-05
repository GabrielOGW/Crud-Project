import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dev } from './../entities/dev.entity';

@Injectable()
export class FindManyDevService {
  constructor(
    @InjectRepository(Dev)
    private readonly devRepository: Repository<Dev>,
  ) {}

  async findAll(): Promise<Dev[]> {
    return this.devRepository.find();
  }
}
