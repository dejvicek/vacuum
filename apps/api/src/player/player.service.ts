import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Player } from './player.types';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async getPlayers(): Promise<Player[]> {
    try {
      const client = this.supabaseService.getClient();

      const { data } = await client.from('player').select().order('nick_name');

      return data as Player[];
    } catch (error) {
      this.logger.error(`Failed to fetch players: ${error.message}`, error);
      throw new InternalServerErrorException(
        `Failed to fetch players: ${error.message}`,
      );
    }
  }
}
