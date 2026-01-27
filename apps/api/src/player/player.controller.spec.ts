import { Test, TestingModule } from '@nestjs/testing';
import { PlayerControllerV1 } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from '@shared-types/Player/player.types';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ConflictException } from '@nestjs/common';

describe('PlayerControllerV1', () => {
  let controller: PlayerControllerV1;
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerControllerV1],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            savePlayer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerControllerV1>(PlayerControllerV1);
    service = module.get<PlayerService>(PlayerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    it('should handle conflict errors from service', async () => {
      const createPlayerDto: CreatePlayerDto = {
        nick_name: 'existingplayer',
        first_name: null,
        last_name: null,
      };
      const error = new ConflictException('Nickname already exists');
      jest.spyOn(service, 'savePlayer').mockRejectedValue(error);

      await expect(controller.savePlayer(createPlayerDto)).rejects.toThrow(
        ConflictException,
      );
      expect(service.savePlayer).toHaveBeenCalledWith(createPlayerDto);
    });
  });
});
