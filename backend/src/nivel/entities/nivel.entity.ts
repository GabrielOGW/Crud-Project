import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dev } from 'src/devs/entities/dev.entity';

@Entity('nivel')
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @OneToMany(() => Dev, (dev) => dev.nivel, { eager: true })
  devs: Dev[];
}
