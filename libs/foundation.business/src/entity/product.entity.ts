import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @AutoMap()
  name: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  price: number;

  @Column({ type: 'int', default: 0 })
  @AutoMap()
  stock: number;

}
