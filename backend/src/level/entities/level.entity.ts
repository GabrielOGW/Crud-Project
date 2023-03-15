import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Dev } from 'src/dev/entities/dev.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @Exclude()
  @OneToMany(() => Dev, (developer) => developer.level, { eager: true })
  developers: Dev[];

  @Expose({ name: 'total_developers' })
  totalDevelopers?(): number {
    return this.developers?.length;
  }
}
