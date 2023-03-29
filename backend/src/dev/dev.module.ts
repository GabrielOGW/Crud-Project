import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DevProviders } from './dev.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DevController],
  providers: [...DevProviders, DevService],
})
export class DevModule {}
