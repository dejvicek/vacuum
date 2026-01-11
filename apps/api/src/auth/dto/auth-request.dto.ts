import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  normalizeUsername,
  trimString,
} from './helpers/normalize-username.helper';

export class AuthRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @Transform(({ value }) => normalizeUsername(value))
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Transform(({ value }) => trimString(value))
  password: string;
}
