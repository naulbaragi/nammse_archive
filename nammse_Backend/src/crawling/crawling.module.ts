import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { NammseRepository } from 'src/nammse/nammse.repository';
import { FactcheckRepository } from 'src/main/main.repository';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot()],
  controllers: [CrawlingController],
  providers: [CrawlingService, NammseRepository, FactcheckRepository],
})
export class CrawlingModule {}
