import { Module } from '@nestjs/common';
import { PlayerControllerV1 } from './player.controller';
import { PlayerControllerV1Pub } from './player-pub.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerControllerV1, PlayerControllerV1Pub],
  providers: [PlayerService],
})
export class PlayerModule {}
