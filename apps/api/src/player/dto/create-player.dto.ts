import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { trimString } from '../../common/utils/trim-string.util';
import { CreatePlayer } from '@shared-types/Player/player.types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePlayerDto implements CreatePlayer {
  @ApiProperty({
    example: 'john_doe',
    description: 'The nickname of the player',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[\p{L}\p{N}_]+$/u, {
    message: 'nick_name can only contain letters, numbers and underscores',
  })
  nick_name: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the player',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsOptional()
  @MaxLength(255)
  first_name: string | null;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the player',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsOptional()
  @MaxLength(255)
  last_name: string | null;
}
