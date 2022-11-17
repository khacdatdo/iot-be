import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Light } from './light.entity';

@Entity()
export class LightData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brightness: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Light, (light) => light.data, {
    onDelete: 'CASCADE',
  })
  light: Light;
}
