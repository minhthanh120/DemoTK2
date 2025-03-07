import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @CreateDateColumn({ type: 'timestamp',default: () => 'now()' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp',default: () => 'now()', onUpdate: 'now()',})
    updatedAt!: Date;
}