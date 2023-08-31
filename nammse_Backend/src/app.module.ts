import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { NammseModule } from './nammse/nammse.module';
import { typeORMconfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workout/workout.module';
import { CrawlingModule } from './crawling/crawling.module';
import { MainModule } from './main/main.module';
import { LifeModule } from './life/life.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    NammseModule,
    AuthModule,
    WorkoutModule,
    CrawlingModule,
    MainModule,
    LifeModule,
    WorkModule,
  ],
})
export class AppModule {}
