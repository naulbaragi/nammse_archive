import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from '../auth/custom-auth.decorator';
import { User } from 'src/auth/user.entity';
import { WorkdataDto } from './dto/work.dto';

@Controller('work')
@UseGuards(AuthGuard())
export class WorkController {
  constructor(private workService: WorkService) {}

  @Post('/workstartupdater')
  workdataPost(
    @Getuser() user: User,
    @Body(ValidationPipe) worktimeDto: WorkdataDto,
  ) {
    console.log(worktimeDto);
    this.workService.updateworkdatadb(user.username, worktimeDto);
  }

  @Put('/workendupdater')
  sleepdataPut(
    @Getuser() user: User,
    @Body(ValidationPipe) worktimeDto: WorkdataDto,
  ) {
    this.workService.putworkdatadb(user.username, worktimeDto);
  }
}
