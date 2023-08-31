import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class information extends BaseEntity {
  // id등을 만들어서 새롭게 추가하는 편이 나을듯

  @Column()
  Episode: number;

  @Column()
  Track: number;

  @Column()
  Singer: string;

  @Column()
  Song: string;

  @Column()
  Link: string;

  @PrimaryColumn()
  Songlink: string;
}
