import { Injectable } from '@nestjs/common';
import { FactcheckRepository } from './main.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(FactcheckRepository)
    private factcheckRepository: FactcheckRepository,
  ) {}

  async getfactcheckdata() {
    return await this.factcheckRepository.factcheckFind();
  }
}
