import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
