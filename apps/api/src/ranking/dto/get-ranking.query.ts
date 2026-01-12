import { IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetRankingQuery {
  @IsNotEmpty({
    message: 'fromDate is required and must be in ISO 8601 format (YYYY-MM-DD)',
  })
  @IsDateString(
    { strict: true },
    {
      message: 'fromDate must be in ISO 8601 format (YYYY-MM-DD)',
    },
  )
  @Type(() => String)
  fromDate!: string;

  @IsNotEmpty({
    message: 'toDate is required and must be in ISO 8601 format (YYYY-MM-DD)',
  })
  @IsDateString(
    { strict: true },
    {
      message: 'toDate must be in ISO 8601 format (YYYY-MM-DD)',
    },
  )
  @Type(() => String)
  toDate!: string;

  getErrorIfInvalid(): string | null {
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      return 'toDate must be greater than or equal to fromDate';
    }
    return null;
  }
}
