import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.types';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  private readonly logger = new Logger(RankingController.name);

  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({ summary: 'Get player rankings between dates' })
  @ApiQuery({ name: 'fromDate', required: false, example: '2024-09-30' })
  @ApiQuery({ name: 'toDate', required: false, example: '2024-12-31' })
  @ApiResponse({ status: 200, description: 'Returns ranking data' })
  async getRanking(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<Ranking[]> {
    this.logger.log(`Fetching rankings from ${fromDate} to ${toDate}`);
    return this.rankingService.getRankingBetweenDates(fromDate, toDate);
  }
}
