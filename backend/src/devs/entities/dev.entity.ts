import { Exclude } from 'class-transformer';
import { Nivel } from 'src/nivel/entities/nivel.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('developers')
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
  nivel_id: number;

  @ManyToOne(() => Nivel, (nivel) => nivel.devs)
  @JoinColumn({ name: 'nivel_id' })
  nivel?: Nivel;
}
