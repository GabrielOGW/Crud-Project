import { Module } from '@nestjs/common';
import { DevsService } from './devs.service';
import { DevsController } from './devs.controller';
import { Dev } from './entities/dev.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dev])],
  controllers: [DevsController],
  providers: [DevsService],
})
export class DevsModule {}
