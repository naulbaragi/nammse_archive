import { IsString } from 'class-validator';
export class LifeSleepDto {
  @IsString()
  sleepdate: string;
  @IsString()
  sleeptime: string;
  @IsString()
  wakedate: string;
  @IsString()
  waketime: string;
}
