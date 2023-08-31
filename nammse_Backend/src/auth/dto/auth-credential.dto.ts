import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AuthCredentialDto {
  @IsString()
  @IsEmail({}, { message: '이메일 주소 형식이 올바르지 않습니다.' })
  username: string;

  @IsString()
  @MinLength(8, { message: '8자리 이상으로 입력해주세요' })
  @MaxLength(40, { message: '40자리 이하로 입력해주세요' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '패스워드를 영어 또는 숫자만을 사용해 입력해주세요',
  })
  password: string;
}
