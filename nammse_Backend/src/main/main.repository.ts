import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FactcheckDto } from './dto/main.dto';
import { factcheckdata } from './main.entity';

@Injectable()
export class FactcheckRepository extends Repository<factcheckdata> {
  constructor(private dataSource: DataSource) {
    super(factcheckdata, dataSource.createEntityManager());
  }

  async factcheckFind(): Promise<factcheckdata[]> {
    const factcheckdata = await this.find({
      order: {
        id: 'DESC',
        //개수제한
      },
      take: 10,
    });
    return factcheckdata;
  }

  async factcheckUpdate(factcheckDto: FactcheckDto): Promise<void> {
    const { Title, Name, Source_link, Source, Factcheckfact } = factcheckDto;
    const factcheckCreate = this.create({
      title: Title,
      name: Name,
      sourcelink: Source_link,
      source: Source,
      factcheckfact: Factcheckfact,
    });
    try {
      await this.save(factcheckCreate);
    } catch (error) {
      console.log('에러발생', error);
    }
  }
}
