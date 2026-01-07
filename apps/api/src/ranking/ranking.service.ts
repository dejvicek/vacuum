import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { db } from '../db';
import { getRankingsBetweenDates } from '../db/schema';
import { Ranking } from './ranking.types';

@Injectable()
export class RankingService {
  private readonly logger = new Logger(RankingService.name);

  async getRankingBetweenDates(
    fromDate: string,
    toDate: string,
  ): Promise<Ranking[]> {
    try {
      const result = await db.execute(
        getRankingsBetweenDates(fromDate, toDate),
      );

      return result.rows as unknown as Ranking[];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to fetch rankings: ${message}`, error);
      throw new InternalServerErrorException(
        `Failed to fetch rankings: ${message}`,
      );
    }
  }
}
