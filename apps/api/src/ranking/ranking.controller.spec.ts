import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.types';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;

  const mockRankings: Ranking[] = [
    {
      id: 1,
      player_id: 1,
      nick_name: 'player1',
      first_name: 'John',
      last_name: 'Doe',
      total_score: 1500,
      total_victories: 10,
      total_defeats: 5,
      total_matches: 15,
      win_rate: 66.67,
      average_score: 100,
    },
    {
      id: 2,
      player_id: 2,
      nick_name: 'player2',
      first_name: 'Jane',
      last_name: 'Smith',
      total_score: 1200,
      total_victories: 8,
      total_defeats: 7,
      total_matches: 15,
      win_rate: 53.33,
      average_score: 80,
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

      const result = await controller.getRanking(fromDate, toDate);

      expect(result).toEqual(mockRankings);
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        fromDate,
        toDate,
      );
    });

    it('should use default dates when parameters are undefined', async () => {
      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      const result = await controller.getRanking(undefined, undefined);

      expect(result).toEqual(mockRankings);
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });

    it('should return empty array when no rankings exist', async () => {
      jest.spyOn(service, 'getRankingBetweenDates').mockResolvedValue([]);

      const result = await controller.getRanking('2024-01-01', '2024-01-31');

      expect(result).toEqual([]);
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const error = new Error('RPC call failed');
      jest.spyOn(service, 'getRankingBetweenDates').mockRejectedValue(error);

      await expect(
        controller.getRanking('2024-09-30', '2024-12-31'),
      ).rejects.toThrow('RPC call failed');
      expect(service.getRankingBetweenDates).toHaveBeenCalledTimes(1);
    });

    it('should return rankings with null numeric fields', async () => {
      const rankingsWithNull: Ranking[] = [
        {
          id: 3,
          player_id: 3,
          nick_name: 'player3',
          first_name: 'Bob',
          last_name: 'Johnson',
          total_score: null,
          total_victories: null,
          total_defeats: null,
          total_matches: null,
          win_rate: null,
          average_score: null,
        },
      ];

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(rankingsWithNull);

      const result = await controller.getRanking('2024-01-01', '2024-01-31');

      expect(result).toEqual(rankingsWithNull);
      expect(result[0].total_score).toBeNull();
      expect(result[0].win_rate).toBeNull();
    });

    it('should handle only fromDate parameter', async () => {
      const fromDate = '2024-09-30';

      jest
        .spyOn(service, 'getRankingBetweenDates')
        .mockResolvedValue(mockRankings);

      const result = await controller.getRanking(fromDate, undefined);

      expect(result).toEqual(mockRankings);
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

      const result = await controller.getRanking(undefined, toDate);

      expect(result).toEqual(mockRankings);
      expect(service.getRankingBetweenDates).toHaveBeenCalledWith(
        undefined,
        toDate,
      );
    });
  });
});
