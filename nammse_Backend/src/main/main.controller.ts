import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';
// import { FactcheckDto } from './dto/main.dto';
import { factcheckdata } from './main.entity';

@Controller('main')
export class MainController {
  constructor(private mainservice: MainService) {}

  @Get('factcheckdata/')
  getMaindata(): Promise<factcheckdata[]> {
    return this.mainservice.getfactcheckdata();
  }
}
