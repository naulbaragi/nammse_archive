import { Controller, Get, Param, Res } from '@nestjs/common';
import { NammseService } from './nammse.service';
import { information } from './nammse.entity';

@Controller('nammse')
export class NammseController {
  constructor(private nammseService: NammseService) {}

  @Get('api/')
  getMaindata(): Promise<information[]> {
    return this.nammseService.getmaindata();
  }

  @Get('api/art/:episode')
  getArtdata(@Param('episode') episode: number, @Res() res: any) {
    this.nammseService.getartdata(episode).pipe(res);
  }
}
