import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';
import { CreatePlayerDto } from './dto/create-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('player')
@ApiBearerAuth()
@Controller('player')
export class PlayerControllerV1 {
  private readonly logger = new Logger(PlayerControllerV1.name);

  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({
    status: 201,
    description: 'The player has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed or invalid input.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. JWT token is missing or invalid.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Player with this nickname already exists.',
  })
  async savePlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(
      `Saving player with nickname: ${createPlayerDto.nick_name}`,
    );
    return this.playerService.savePlayer(createPlayerDto);
  }
}
