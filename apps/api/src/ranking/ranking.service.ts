import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Ranking } from './ranking.types';

@Injectable()
export class RankingService {
  private readonly logger = new Logger(RankingService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async getRankingBetweenDates(
    fromDate: string = '2024-09-30',
    toDate: string = '2024-12-31',
  ): Promise<Ranking[]> {
    try {
      const client = this.supabaseService.getClient();

      const { data } = await client.rpc('get_rankings_between_dates', {
        from_date: fromDate,
        to_date: toDate,
      });

      return data as Ranking[];
    } catch (error) {
      this.logger.error(`Failed to fetch rankings: ${error.message}`, error);
      throw new InternalServerErrorException(
        `Failed to fetch rankings: ${error.message}`,
      );
    }
  }
}
