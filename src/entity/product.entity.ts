import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

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

  @CreateDateColumn({ type: 'timestamp',default: () => 'now()' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',default: () => 'now()', onUpdate: 'now()',})
  @AutoMap()
  updatedAt: Date;
}
