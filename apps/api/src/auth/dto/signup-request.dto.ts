import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUsernameUnique } from '../validators/is-username-unique.validator';
import { normalizeUsername } from './helpers/normalize-username.helper';
import { trimString } from '../../common/utils/trim-string.util';

export class SignupRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsUsernameUnique()
  @Transform(({ value }) => normalizeUsername(value))
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Transform(({ value }) => trimString(value))
  password: string;
}
