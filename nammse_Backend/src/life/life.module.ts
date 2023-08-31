import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LifeController } from './life.controller';
import { LifeService } from './life.service';
import { LifeRepository } from './life.repository';

@Module({
  imports: [AuthModule],
  controllers: [LifeController],
  providers: [LifeService, LifeRepository],
})
export class LifeModule {}
