import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutRepository, WorkouttimeRepository } from './workout.repository';
import { WorkoutDto, WorkouttimeDto } from './dto/workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutRepository)
    @InjectRepository(WorkouttimeRepository)
    private workRepository: WorkoutRepository,
    private workouttimeRepository: WorkouttimeRepository,
  ) {}
  async updateworkoutdb(username: string, workoutDto: WorkoutDto) {
    console.log(username, workoutDto);
    return this.workRepository.updateweightdata(username, workoutDto);
  }

  async getworkoutdb(username: string) {
    return this.workRepository.getweightdata(username);
  }

  async postworkoutstarttimedb(
    username: string,
    workouttimeDto: WorkouttimeDto,
  ) {
    return this.workouttimeRepository.createtimedata(username, workouttimeDto);
  }

  async updateworkoutendtimedb(
    username: string,
    workouttimeDto: WorkouttimeDto,
  ) {
    return this.workouttimeRepository.updatetimedata(username, workouttimeDto);
  }

  async getworkouttimedb(username: string) {
    return this.workouttimeRepository.getworkouttimedata(username);
  }
}
