import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'User' })
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'date', nullable:true })
  dateofbirth?: Date;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;
}

