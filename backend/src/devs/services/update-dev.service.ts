import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dev } from './../entities/dev.entity';
import { UpdateDevDto } from './../dto/update-dev.dto';

@Injectable()
export class UpdateDevService {
  constructor(
    @InjectRepository(Dev)
    private readonly devRepository: Repository<Dev>,
  ) {}

  async update(id: number, UpdateDevDto: UpdateDevDto): Promise<Dev> {
    const dev = await this.devRepository.findOne({ where: { id } });
    if (!dev) {
      throw new Error(`Nivel with id ${id} not found.`);
    }

    Object.assign(dev, UpdateDevDto);
    return this.devRepository.save(dev);
  }
}
