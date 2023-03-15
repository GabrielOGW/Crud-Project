import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelService {
  constructor(
    @Inject('LEVEL_REPOSITORY')
    private LevelRepository: Repository<Level>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    return this.LevelRepository.save(createLevelDto);
  }

  findAll() {
    return this.LevelRepository.find();
  }

  findOne(id: number) {
    return this.LevelRepository.findOne({ where: { id } });
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return this.LevelRepository.update(id, updateLevelDto)
  }

  remove(id: number) {
    return this.LevelRepository.delete(id)
  }
}
