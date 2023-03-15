import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Dev } from './entities/dev.entity';

@Injectable()
export class DevService {
  constructor(
    @Inject('DEV_REPOSITORY')
    private DevRepository: Repository<Dev>,
  ) {}
  
  create(createDevDto: CreateDevDto) {
    return this.DevRepository.save(createDevDto);
  }

  findAll() {
    return this.DevRepository.find();
  }

  findOne(id: number) {
    return this.DevRepository.findOne({ where: { id } });
  }

  update(id: number, updateDevDto: UpdateDevDto) {
    return this.DevRepository.update(id, updateDevDto);
  }

  remove(id: number) {
    return this.DevRepository.delete(id);
  }
}
