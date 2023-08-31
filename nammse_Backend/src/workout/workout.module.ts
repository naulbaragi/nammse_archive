import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { AuthModule } from 'src/auth/auth.module';
import { WorkoutRepository, WorkouttimeRepository } from './workout.repository';

@Module({
  imports: [AuthModule],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository, WorkouttimeRepository],
})
export class WorkoutModule {}
