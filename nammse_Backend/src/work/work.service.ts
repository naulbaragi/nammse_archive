import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkRepository } from './work.repository';
import { WorkdataDto } from './dto/work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkRepository)
    private workRepository: WorkRepository,
  ) {}
  async updateworkdatadb(username: string, workdataDto: WorkdataDto) {
    console.log('arstarstarstarsta', username, workdataDto);
    return this.workRepository.updateworktimedata(username, workdataDto);
  }

  async putworkdatadb(username: string, workdataDto: WorkdataDto) {
    return this.workRepository.putworktimedata(username, workdataDto);
  }
}
