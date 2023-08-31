import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { AuthGuard } from '@nestjs/passport';
import { WorkoutDto, WorkouttimeDto } from './dto/workout.dto';
import { Getuser } from '../auth/custom-auth.decorator';
import { User } from 'src/auth/user.entity';

@Controller('workout')
@UseGuards(AuthGuard())
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('/workoutweightsignin')
  weightdataPost(
    @Getuser() user: User,
    @Body(ValidationPipe) workoutDto: WorkoutDto,
  ) {
    this.workoutService.updateworkoutdb(user.username, workoutDto);
  }

  @Get('/workoutweightget')
  weightdataGet(@Getuser() user: User) {
    return this.workoutService.getworkoutdb(user.username);
  }

  @Post('/workoutstarttime')
  startdataPost(
    @Getuser() user: User,
    @Body(ValidationPipe) workouttimeDto: WorkouttimeDto,
  ) {
    this.workoutService.postworkoutstarttimedb(user.username, workouttimeDto);
  }

  @Put('/workoutendtime')
  enddataPut(
    @Getuser() user: User,
    @Body(ValidationPipe) workouttimeDto: WorkouttimeDto,
  ) {
    this.workoutService.updateworkoutendtimedb(user.username, workouttimeDto);
  }

  @Get('/workouttime')
  workouttimedataGut(@Getuser() user: User) {
    return this.workoutService.getworkouttimedb(user.username);
  }
}
