import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Workoutweight, Workouttime } from './workout.entity';
import { WorkoutDto, WorkouttimeDto } from './dto/workout.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class WorkoutRepository extends Repository<Workoutweight> {
  constructor(private dataSource: DataSource) {
    super(Workoutweight, dataSource.createEntityManager());
  }
  async updateweightdata(
    username: string,
    workoutDto: WorkoutDto,
  ): Promise<void> {
    const {
      date,
      squatweight,
      squatreps,
      benchpressweight,
      benchpressreps,
      deadliftweight,
      deadliftreps,
    } = workoutDto;
    const weightdata = this.create({
      username,
      date,
      squatweight,
      squatreps,
      benchpressweight,
      benchpressreps,
      deadliftweight,
      deadliftreps,
    });
    await this.save(weightdata);
  }

  async getweightdata(username: string): Promise<Workoutweight> {
    const options: FindOneOptions<Workoutweight> = {
      where: { username: username },
      order: { id: 'DESC' },
    };
    const weightINdb = await this.findOne(options);
    console.log(weightINdb);
    return weightINdb;
  }
}

@Injectable()
export class WorkouttimeRepository extends Repository<Workouttime> {
  constructor(private dataSource: DataSource) {
    super(Workouttime, dataSource.createEntityManager());
  }

  async createtimedata(
    username: string,
    workouttimeDto: WorkouttimeDto,
  ): Promise<void> {
    console.log(workouttimeDto);
    const { startdate, starttime, isWorkingout } = workouttimeDto;
    const workouttimedata = this.create({
      username: username,
      workoutstartdate: startdate,
      workoutstarttime: starttime,
      isworkingout: isWorkingout,
    });
    await this.save(workouttimedata);
  }

  async updatetimedata(
    username: string,
    workouttimeDto: WorkouttimeDto,
  ): Promise<void> {
    console.log(workouttimeDto);
    const { enddate, endtime, isWorkingout } = workouttimeDto;
    await this.update(
      { username: username, isworkingout: true },
      {
        workoutenddate: enddate,
        workoutendtime: endtime,
        isworkingout: isWorkingout,
      },
    );
  }

  async getworkouttimedata(username: string): Promise<Workouttime> {
    const options: FindOneOptions<Workouttime> = {
      where: { username: username, isworkingout: true },
    };
    const timeINdb = await this.findOne(options);
    console.log(timeINdb);
    return timeINdb;
  }
}
