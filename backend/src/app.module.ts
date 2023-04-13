import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './nivel/entities/nivel.entity';
import { Dev } from './devs/entities/dev.entity';

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
  ],
})
export class AppModule {}
