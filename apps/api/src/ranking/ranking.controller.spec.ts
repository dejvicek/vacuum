import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.types';

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
      const fromDate = '2024-09-30';
      const toDate = '2024-12-31';

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      expect(await controller.getRanking(fromDate, toDate)).toStrictEqual(
        mockRankings,
      );
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        fromDate,
        toDate,
      );
    });

    it('should use default dates when parameters are undefined', async () => {
      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      expect(await controller.getRanking(undefined, undefined)).toStrictEqual(
        mockRankings,
      );
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });

    it('should return empty array when no rankings exist', async () => {
      jest.spyOn(service, 'getRankingBetweenDates').mockResolvedValue([]);

      const result = await controller.getRanking('2024-01-01', '2024-01-31');

      expect(result).toStrictEqual([]);
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const error = new Error('Database query failed');
      jest.spyOn(service, 'getRankingBetweenDates').mockRejectedValue(error);

      await expect(
        controller.getRanking('2024-09-30', '2024-12-31'),
      ).rejects.toThrow('Database query failed');
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });

    it('should handle only fromDate parameter', async () => {
      const fromDate = '2024-09-30';

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      expect(await controller.getRanking(fromDate, undefined)).toStrictEqual(
        mockRankings,
      );
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        fromDate,
        undefined,
      );
    });

    it('should handle only toDate parameter', async () => {
      const toDate = '2024-12-31';

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      expect(await controller.getRanking(undefined, toDate)).toStrictEqual(
        mockRankings,
      );
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        undefined,
        toDate,
      );
    });
  });
});
