import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dev } from 'src/devs/entities/dev.entity';
import { Exclude } from 'class-transformer';

@Entity('nivel')
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @Exclude()
  @OneToMany(() => Dev, (dev) => dev.nivel, { eager: true })
  devs: Dev[];
}
