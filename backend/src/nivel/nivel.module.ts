import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelController } from './nivel.controller';
import { Nivel } from './entities/nivel.entity';
import { CreateNivelService } from './services/create-nivel.service';
import { UpdateNivelService } from './services/update-nivel.service';
import { FindManyNivelService } from './services/find-many-nivel.service';
import { FindNivelService } from './services/find-nivel.service';
import { DeleteNivelService } from './services/delete-nivel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  providers: [
    CreateNivelService,
    UpdateNivelService,
    FindManyNivelService,
    FindNivelService,
    DeleteNivelService,
  ],
  controllers: [NivelController],
})
export class NivelModule {}
