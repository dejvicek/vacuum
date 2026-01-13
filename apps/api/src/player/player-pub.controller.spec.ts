import { Test, TestingModule } from '@nestjs/testing';
import { PlayerControllerV1Pub } from './player-pub.controller';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';

describe('PlayerControllerV1Pub', () => {
  let controller: PlayerControllerV1Pub;
  let service: PlayerService;

  const mockPlayers: Player[] = [
    {
      id: 1,
      nick_name: 'player1',
      first_name: 'John',
      last_name: 'Doe',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      nick_name: 'player2',
      first_name: 'Jane',
      last_name: 'Smith',
      created_at: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerControllerV1Pub],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerControllerV1Pub>(PlayerControllerV1Pub);
    service = module.get<PlayerService>(PlayerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPlayers', () => {
    it('should return an array of players', async () => {
      jest.spyOn(service, 'getPlayers').mockResolvedValue(mockPlayers);

      expect(await controller.getPlayers()).toStrictEqual(mockPlayers);
      expect(service.getPlayers).toHaveBeenCalled();
    });

    it('should return empty array when no players exist', async () => {
      jest.spyOn(service, 'getPlayers').mockResolvedValue([]);

      expect(await controller.getPlayers()).toStrictEqual([]);
      expect(service.getPlayers).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const error = new Error('Database connection failed');
      jest.spyOn(service, 'getPlayers').mockRejectedValue(error);

      await expect(controller.getPlayers()).rejects.toThrow(
        'Database connection failed',
      );
      expect(service.getPlayers).toHaveBeenCalledTimes(1);
    });

    it('should return players with null fields', async () => {
      const playersWithNull: Player[] = [
        {
          id: 3,
          nick_name: 'player3',
          first_name: 'Bob',
          last_name: null,
          created_at: new Date().toISOString(),
        },
      ];

      jest.spyOn(service, 'getPlayers').mockResolvedValue(playersWithNull);

      const result = await controller.getPlayers();

      expect(result).toStrictEqual(playersWithNull);
      expect(result[0].last_name).toBeNull();
    });
  });
});
