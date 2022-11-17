import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LightData } from './light-data.entity';

@Entity()
export class Light {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  lightName: string;

  @Column()
  mode: number;

  @Column()
  enabled: boolean;

  @OneToMany(() => LightData, (data) => data.light)
  data: LightData[];
}
