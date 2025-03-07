import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class CategoryDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @AutoMap()
  name: string;
  
  @Column()
  @AutoMap()
  createdAt: string;
  
  @Column()
  @AutoMap()
  updateAt: string;
}
