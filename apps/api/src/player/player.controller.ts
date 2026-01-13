import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';
import { CreatePlayerDto } from './dto/create-player.dto';

@ApiTags('player')
@Controller()
export class PlayerController {
  private readonly logger = new Logger(PlayerController.name);

  constructor(private readonly playerService: PlayerService) {}

  @Get('public/player')
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Returns all players' })
  async getPlayers(): Promise<Player[]> {
    this.logger.log('Fetching all players');
    return this.playerService.getPlayers();
  }

  @Post('player')
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
