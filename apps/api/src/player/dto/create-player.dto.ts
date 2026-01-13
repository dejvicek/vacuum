import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { CreatePlayer } from '@shared-types/Player/player.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto implements CreatePlayer {
  @ApiProperty({
    example: 'john_doe',
    description: 'The nickname of the player',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nick_name: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the player',
    required: false,
    nullable: true,
  })
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
  @IsString()
  @IsOptional()
  @MaxLength(255)
  last_name: string | null;
}
