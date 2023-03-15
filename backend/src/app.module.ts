import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevModule } from './dev/dev.module';
import { LevelModule } from './level/level.module';

@Module({
  imports: [DevModule, LevelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
