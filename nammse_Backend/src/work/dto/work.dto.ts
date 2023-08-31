import { IsBoolean, IsString } from 'class-validator';
export class WorkdataDto {
  @IsBoolean()
  isworking: boolean;
  @IsString()
  workstartdate?: string = '';
  @IsString()
  workstarttime?: string = '';
  @IsString()
  workenddate?: string = '';
  @IsString()
  workendtime?: string = '';
}
