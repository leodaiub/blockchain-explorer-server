import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Search extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @CreateDateColumn()
  dateCreated: Date;
}
