import { Exclude } from 'class-transformer';
import { Level } from 'src/level/entities/level.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Dev {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sexo: string;

  @Column()
  dataNascimento: Date;

  @Column()
  idade: number;

  @Column()
  hobby: string;

  @Exclude()
  @Column()
  level_id: number;

  @ManyToOne(() => Level, (level) => level.developers)
  @JoinColumn({ name: 'level_id' })
  level?: Level;
}
