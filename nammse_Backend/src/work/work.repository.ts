import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Work } from './work.entity';
import { WorkdataDto } from './dto/work.dto';

@Injectable()
export class WorkRepository extends Repository<Work> {
  constructor(private dataSource: DataSource) {
    super(Work, dataSource.createEntityManager());
  }

  async updateworktimedata(
    username: string,
    workdataDto: WorkdataDto,
  ): Promise<void> {
    const { workstartdate, workstarttime } = workdataDto;
    const workdata = this.create({
      username: username,
      isworking: true,
      workstartdate: workstartdate,
      workstarttime: workstarttime,
    });
    console.log('workdata', workdata);
    await this.save(workdata);
  }

  async putworktimedata(
    username: string,
    workdataDto: WorkdataDto,
  ): Promise<void> {
    const { workenddate, workendtime } = workdataDto;
    this.update(
      { username: username, isworking: true },
      {
        isworking: false,
        workenddate: workenddate,
        workendtime: workendtime,
      },
    );
  }
}
