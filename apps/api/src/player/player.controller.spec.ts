import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';
import { CreatePlayerDto } from './dto/create-player.dto';

describe('PlayerController', () => {
  let controller: PlayerController;
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
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn(),
            savePlayer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
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

  describe('savePlayer', () => {
    it('should create and return a player', async () => {
      const createPlayerDto: CreatePlayerDto = {
        nick_name: 'newplayer',
        first_name: 'New',
        last_name: 'Player',
      };
      const createdPlayer: Player = {
        id: 3,
        ...createPlayerDto,
        created_at: new Date().toISOString(),
      };

      jest.spyOn(service, 'savePlayer').mockResolvedValue(createdPlayer);

      const result = await controller.savePlayer(createPlayerDto);

      expect(result).toStrictEqual(createdPlayer);
      expect(service.savePlayer).toHaveBeenCalledWith(createPlayerDto);
    });

    it('should handle service errors', async () => {
      const createPlayerDto: CreatePlayerDto = {
        nick_name: 'errorplayer',
        first_name: null,
        last_name: null,
      };
      const error = new Error('Database error');
      jest.spyOn(service, 'savePlayer').mockRejectedValue(error);

      await expect(controller.savePlayer(createPlayerDto)).rejects.toThrow(
        'Database error',
      );
      expect(service.savePlayer).toHaveBeenCalledWith(createPlayerDto);
    });
  });
});
