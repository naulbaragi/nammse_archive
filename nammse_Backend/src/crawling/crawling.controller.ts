import { Controller, Get } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('crawling')
export class CrawlingController {
  constructor(private crawlingService: CrawlingService) {}

  @Get('/')
  getArtdata() {
    this.crawlingService.updatemaindata();
  }
}
