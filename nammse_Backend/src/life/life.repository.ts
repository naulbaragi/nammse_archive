import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Sleep } from './life.entity';
import { LifeSleepDto } from './dto/life.dto';

@Injectable()
export class LifeRepository extends Repository<Sleep> {
  constructor(private dataSource: DataSource) {
    super(Sleep, dataSource.createEntityManager());
  }

  async updatesleepdata(
    username: string,
    LifeSleepDto: LifeSleepDto,
  ): Promise<void> {
    const { sleepdate, sleeptime, wakedate, waketime } = LifeSleepDto;
    const sleepdata = this.create({
      username: username,
      sleepdate: sleepdate,
      sleeptime: sleeptime,
      wakedate: wakedate,
      waketime: waketime,
    });
    await this.save(sleepdata);
  }
}
