import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { information } from './nammse.entity';
import { NammseDto } from './dto/nammse.dto';

@Injectable()
export class NammseRepository extends Repository<information> {
  constructor(private dataSource: DataSource) {
    super(information, dataSource.createEntityManager());
  }

  async nammseFind(): Promise<information[]> {
    const nammsesortdata = await this.find({
      order: {
        Episode: 'DESC',
        Track: 'ASC',
      },
    });
    return nammsesortdata;
  }

  async nammseFindOne(number: number): Promise<boolean> {
    const nammsesortonedata = await this.findOne({
      where: { Episode: number },
    });
    if (nammsesortonedata) {
      return true;
    } else {
      return false;
    }
  }

  async nammseUpdate(nammseDto: NammseDto): Promise<void> {
    const { Episode, Track, Singer, Song, Link, Songlink } = nammseDto;
    const nammseCreate = this.create({
      Episode: Episode,
      Track: Track,
      Singer: Singer,
      Song: Song,
      Link: Link,
      Songlink: Songlink,
    });
    try {
      await this.save(nammseCreate);
    } catch (error) {
      console.log('에러발생', error);
    }
  }
}
