import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LevelProviders } from './level.providers';

@Module({
  controllers: [LevelController],
  imports: [DatabaseModule],
  providers: [...LevelProviders, LevelService],
})
export class LevelModule {}
