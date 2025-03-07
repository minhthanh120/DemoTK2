import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class ProductCategory{
  @Column({primary:true})
  productId: string;

  @Column({primary:true})
  categoryId: string;
}
