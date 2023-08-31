import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { NammseRepository } from './nammse.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { information } from './nammse.entity';
import { StorageSRC } from 'src/SecretKEY_backend';

@Injectable()
export class NammseService {
  constructor(
    @InjectRepository(NammseRepository)
    private nammseRepository: NammseRepository,
  ) {}

  async getmaindata(): Promise<information[]> {
    return await this.nammseRepository.nammseFind();
  }
  //이부분도 조정
  getartdata(episode: number) {
    const artpath = path.join(StorageSRC, episode + '.png');
    if (fs.existsSync(artpath)) {
      const artimage = fs.createReadStream(artpath);
      return artimage;
    } else {
      const tempimage = fs.createReadStream(StorageSRC + '/temp.png');
      return tempimage;
    }
  }
}
