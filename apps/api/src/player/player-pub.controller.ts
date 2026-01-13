import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';

@ApiTags('player')
@Controller('public/player')
export class PlayerControllerV1Pub {
  private readonly logger = new Logger(PlayerControllerV1Pub.name);

  constructor(private readonly playerService: PlayerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Returns all players' })
  async getPlayers(): Promise<Player[]> {
    this.logger.log('Fetching all players');
    return this.playerService.getPlayers();
  }
}
