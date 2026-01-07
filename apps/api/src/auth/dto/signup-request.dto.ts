import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { IsUsernameUnique } from '../validators/is-username-unique.validator';

export class SignupRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsUsernameUnique()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
