import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Repository } from 'typeorm';
import { Dev } from './entities/dev.entity';

@Injectable()
export class DevsService {
  constructor(
    @InjectRepository(Dev)
    private DevRepository: Repository<Dev>,
  ) {}
  create(createDevDto: CreateDevDto) {
    return this.DevRepository.save(createDevDto);
  }

  findAll(): Promise<Dev[]> {
    return this.DevRepository.find();
  }

  findOne(id: number): Promise<Dev | null> {
    return this.DevRepository.findOne({ where: { id } });
  }

  update(id: number, updateDevDto: UpdateDevDto) {
    return this.DevRepository.update(id, updateDevDto);
  }

  async remove(id: number): Promise<void> {
    await this.DevRepository.delete(id);
  }
}
