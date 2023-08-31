import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Sleep extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  sleepdate: string;

  @Column()
  sleeptime: string;

  @Column()
  wakedate: string;

  @Column()
  waketime: string;
}
