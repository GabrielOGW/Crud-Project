import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './nivel/entities/nivel.entity';
import { Dev } from './devs/entities/dev.entity';
import { NivelModule } from './nivel/nivel.module';
import { DevsModule } from './devs/devs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'crud',
      entities: [Nivel, Dev],
      synchronize: true,
    }),
    NivelModule,
    DevsModule,
  ],
})
export class AppModule {}
