import { Module } from '@nestjs/common';
import { NammseController } from './nammse.controller';
import { NammseService } from './nammse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NammseRepository } from './nammse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NammseRepository])],
  controllers: [NammseController],
  providers: [NammseService, NammseRepository],
})
export class NammseModule {}
