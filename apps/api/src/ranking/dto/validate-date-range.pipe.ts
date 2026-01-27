import { Injectable, BadRequestException, PipeTransform } from '@nestjs/common';
import { GetRankingQuery } from './get-ranking.query';

@Injectable()
export class ValidateDateRangePipe implements PipeTransform {
  transform(value: GetRankingQuery): GetRankingQuery {
    const error = value.getErrorIfInvalid();
    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
