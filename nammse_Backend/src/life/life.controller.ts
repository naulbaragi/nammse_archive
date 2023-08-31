import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { LifeService } from './life.service';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from '../auth/custom-auth.decorator';
import { User } from 'src/auth/user.entity';
import { LifeSleepDto } from './dto/life.dto';

@Controller('life')
@UseGuards(AuthGuard())
export class LifeController {
  constructor(private lifeService: LifeService) {}

  @Post('/sleepupdater')
  sleepdataPost(
    @Getuser() user: User,
    @Body(ValidationPipe) lifesleepDto: LifeSleepDto,
  ) {
    this.lifeService.updatesleepdatadb(user.username, lifesleepDto);
  }
}
