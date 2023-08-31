import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class WorkoutDto {
  @IsString()
  date: string;
  @IsNumber()
  squatweight: number;
  @IsNumber()
  squatreps: number;
  @IsNumber()
  benchpressweight: number;
  @IsNumber()
  benchpressreps: number;
  @IsNumber()
  deadliftweight: number;
  @IsNumber()
  deadliftreps: number;
}

export class WorkouttimeDto {
  @IsString()
  startdate?: string = '';
  @IsString()
  enddate?: string = '';
  @IsString()
  starttime?: string = '';
  @IsString()
  endtime?: string = '';
  @IsBoolean()
  isWorkingout: boolean;
}
