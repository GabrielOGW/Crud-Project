import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dev } from './../entities/dev.entity';

@Injectable()
export class DeleteDevService {
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Dev)
    private readonly devRepository: Repository<Dev>,
  ) {}

  async remove(id: number): Promise<void> {
    const dev = await this.devRepository.findOne({ where: { id } });
    if (!dev) {
      throw new HttpException(
        `Dev with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.devRepository.delete(id);
  }
}
