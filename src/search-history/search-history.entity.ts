import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SearchType {
  Address = 'Address',
  Transaction = 'Transaction',
}

@Entity()
export class Search extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @Column({ enum: SearchType })
  type: SearchType;

  @CreateDateColumn()
  dateCreated: Date;
}
