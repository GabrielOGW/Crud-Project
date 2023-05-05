import { Module } from '@nestjs/common';
import { DevsController } from './devs.controller';
import { Dev } from './entities/dev.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDevService } from './services/create-dev.service';
import { UpdateDevService } from './services/update-dev.service';
import { FindDevService } from './services/find-dev.service';
import { FindManyDevService } from './services/find-many-dev.service';
import { DeleteDevService } from './services/delete-dev.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dev])],
  providers: [
    CreateDevService,
    UpdateDevService,
    FindDevService,
    FindManyDevService,
    DeleteDevService,
  ],
  controllers: [DevsController],
})
export class DevsModule {}
