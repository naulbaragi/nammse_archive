import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LifeRepository } from './life.repository';
import { LifeSleepDto } from './dto/life.dto';

@Injectable()
export class LifeService {
  constructor(
    @InjectRepository(LifeRepository)
    private lifeRepository: LifeRepository,
  ) {}
  async updatesleepdatadb(username: string, lifeSleepDto: LifeSleepDto) {
    console.log(username, lifeSleepDto);
    return this.lifeRepository.updatesleepdata(username, lifeSleepDto);
  }
}
