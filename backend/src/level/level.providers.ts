import { DataSource } from 'typeorm';
import { Level } from './entities/level.entity';

export const LevelProviders = [
  {
    provide: 'LEVEL_REPOSITORY',
    useFactory: (DataSource: DataSource) => DataSource.getRepository(Level),
    inject: ['DATA_SOURCE'],
  },
];
