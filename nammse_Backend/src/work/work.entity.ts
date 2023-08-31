import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Work extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  isworking: boolean;

  @Column()
  username: string;

  @Column()
  workstartdate: string;

  @Column()
  workstarttime: string;

  @Column()
  workenddate: string;

  @Column()
  workendtime: string;
}
