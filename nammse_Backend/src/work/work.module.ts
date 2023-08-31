import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { WorkRepository } from './work.repository';

@Module({
  imports: [AuthModule],
  controllers: [WorkController],
  providers: [WorkService, WorkRepository],
})
export class WorkModule {}
