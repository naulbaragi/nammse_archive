import { IsString } from 'class-validator';
export class NammseYoutubeCrawlingDto {
  @IsString()
  startdate?: string = '';
}

export class NammseInstagramCrawlingDto {
  @IsString()
  startdate?: string = '';
}
