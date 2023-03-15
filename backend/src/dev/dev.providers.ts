import { DataSource } from 'typeorm';
import { Dev } from './entities/dev.entity';

export const DevProviders = [
  {
    provide: 'DEV_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dev),
    inject: ['DATA_SOURCE'],
  },
];
