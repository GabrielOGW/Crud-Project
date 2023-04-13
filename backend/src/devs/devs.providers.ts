import { DataSource, Repository } from 'typeorm';
import { Dev } from './entities/dev.entity';

export const DevProviders = [
  {
    provide: 'DEVS_REPOSITORY',
    useFactory: (dataSource: DataSource) => Repository<Dev>,
    inject: ['DATA_SOURCE'],
  },
];
