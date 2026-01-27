import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.types';
import { GetRankingQuery } from './dto/get-ranking.query';
import { ValidateDateRangePipe } from './dto/validate-date-range.pipe';

@ApiTags('ranking')
@Controller('public/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({ summary: 'Get player rankings between dates' })
  @ApiQuery({ name: 'fromDate', required: true, example: '2024-09-30' })
  @ApiQuery({ name: 'toDate', required: true, example: '2024-12-31' })
  @ApiResponse({ status: 200, description: 'Returns ranking data' })
  @UsePipes(new ValidationPipe({ transform: true }), ValidateDateRangePipe)
  async getRanking(@Query() query: GetRankingQuery): Promise<Ranking[]> {
    return this.rankingService.getRankingBetweenDates(
      query.fromDate,
      query.toDate,
    );
  }
}
