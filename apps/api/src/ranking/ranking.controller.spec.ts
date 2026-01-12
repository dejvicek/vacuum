import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.types';
import { GetRankingQuery } from './dto/get-ranking.query';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;

  const mockRankings: Ranking[] = [
    {
      points: 1500,
      nick_name: 'player1',
      first_name: 'John',
      last_name: 'Doe',
      num_of_tournaments: 10,
    },
    {
      points: 1200,
      nick_name: 'player2',
      first_name: 'Jane',
      last_name: 'Smith',
      num_of_tournaments: 8,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getRankingBetweenDates: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRanking', () => {
    it('should return ranking data with provided dates', async () => {
      const query: GetRankingQuery = {
        fromDate: '2024-09-30',
        toDate: '2024-12-31',
        getErrorIfInvalid: () => null,
      };

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      expect(await controller.getRanking(query)).toStrictEqual(mockRankings);
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        '2024-09-30',
        '2024-12-31',
      );
    });

    it('should return empty array when no rankings exist', async () => {
      const query: GetRankingQuery = {
        fromDate: '2024-01-01',
        toDate: '2024-01-31',
        getErrorIfInvalid: () => null,
      };

      jest.spyOn(service, 'getRankingBetweenDates').mockResolvedValue([]);

      const result = await controller.getRanking(query);

      expect(result).toStrictEqual([]);
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const query: GetRankingQuery = {
        fromDate: '2024-09-30',
        toDate: '2024-12-31',
        getErrorIfInvalid: () => null,
      };
      const error = new Error('Database query failed');
      jest.spyOn(service, 'getRankingBetweenDates').mockRejectedValue(error);

      await expect(controller.getRanking(query)).rejects.toThrow(
        'Database query failed',
      );
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });
  });
});
