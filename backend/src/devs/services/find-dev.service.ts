import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dev } from './../entities/dev.entity';

@Injectable()
export class FindDevService {
  constructor(
    @InjectRepository(Dev)
    private readonly devRepository: Repository<Dev>,
  ) {}

  async findOne(id: number): Promise<Dev> {
    const dev = await this.devRepository.findOne({ where: { id } });
    if (!dev) {
      throw new Error(`Dev with id ${id} not found.`);
    }
    return dev;
  }
}
