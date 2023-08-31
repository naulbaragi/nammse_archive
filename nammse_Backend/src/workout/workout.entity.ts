import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Workoutweight extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  date: string;

  @Column()
  squatweight: number;

  @Column()
  squatreps: number;

  @Column()
  benchpressweight: number;

  @Column()
  benchpressreps: number;

  @Column()
  deadliftweight: number;

  @Column()
  deadliftreps: number;
}
@Entity()
export class Workouttime extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  isworkingout: boolean;

  @Column()
  username: string;

  @Column()
  workoutstartdate: string;

  @Column()
  workoutenddate: string;

  @Column()
  workoutstarttime: string;

  @Column()
  workoutendtime: string;
}
