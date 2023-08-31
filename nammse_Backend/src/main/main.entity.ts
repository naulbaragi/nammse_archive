import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class factcheckdata extends BaseEntity {
  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  sourcelink: string;

  @Column()
  factcheckfact: string;

  @Column()
  source: string;

  @PrimaryColumn()
  id: number;
}
