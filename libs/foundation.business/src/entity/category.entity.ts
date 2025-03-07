import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Unique } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Category extends BaseEntity {

  @Column({unique:true})
  @AutoMap()
  name: string;
}
