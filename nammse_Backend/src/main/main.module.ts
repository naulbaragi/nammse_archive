import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactcheckRepository } from './main.repository';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [TypeOrmModule.forFeature([FactcheckRepository])],
  controllers: [MainController],
  providers: [MainService, FactcheckRepository],
})
export class MainModule {}
