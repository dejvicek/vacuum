import { BadRequestException } from '@nestjs/common';
import { ValidateDateRangePipe } from './validate-date-range.pipe';
import { GetRankingQuery } from './get-ranking.query';

describe('ValidateDateRangePipe', () => {
  let pipe: ValidateDateRangePipe;

  beforeEach(() => {
    pipe = new ValidateDateRangePipe();
  });

  describe('transform', () => {
    it('should return value when date range is valid', () => {
      const query: GetRankingQuery = {
        fromDate: '2026-01-01',
        toDate: '2026-01-31',
        getErrorIfInvalid: () => null,
      };

      expect(pipe.transform(query)).toEqual(query);
    });

    it('should return value when fromDate equals toDate', () => {
      const query: GetRankingQuery = {
        fromDate: '2026-01-15',
        toDate: '2026-01-15',
        getErrorIfInvalid: () => null,
      };

      expect(pipe.transform(query)).toEqual(query);
    });

    it('should throw BadRequestException when date range is invalid', () => {
      const errorMessage = 'toDate must be greater than or equal to fromDate';
      const query: GetRankingQuery = {
        fromDate: '2026-01-31',
        toDate: '2026-01-01',
        getErrorIfInvalid: () => errorMessage,
      };

      expect(() => pipe.transform(query)).toThrow(
        new BadRequestException(errorMessage),
      );
    });

    it('should throw BadRequestException with correct error message', () => {
      const errorMessage = 'toDate must be greater than or equal to fromDate';
      const query: GetRankingQuery = {
        fromDate: '2026-02-01',
        toDate: '2026-01-01',
        getErrorIfInvalid: () => errorMessage,
      };

      expect(() => pipe.transform(query)).toThrow(BadRequestException);
      expect(() => pipe.transform(query)).toThrow(errorMessage);
    });
  });
});
