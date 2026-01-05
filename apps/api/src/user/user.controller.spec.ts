import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './users.types';

jest.mock('../db', () => ({
  db: {
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let loggerSpy: jest.SpyInstance;

  const mockUsers: User[] = [
    {
      id: 1,
      username: 'john_doe',
      password: 'hashed_password_1',
    },
    {
      id: 2,
      username: 'jane_smith',
      password: 'hashed_password_2',
    },
  ];

  beforeEach(async () => {
    const mockUserService = {
      findAllUsers: jest.fn().mockResolvedValue([]),
      findUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    loggerSpy = jest.spyOn(controller['logger'], 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPlayers', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      const result = await controller.getPlayers();

      expect(result).toEqual(mockUsers);
      expect(service.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no users exist', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue([]);

      const result = await controller.getPlayers();

      expect(result).toEqual([]);
      expect(service.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors gracefully', async () => {
      const error = new Error('Database connection failed');
      jest.spyOn(service, 'findAllUsers').mockRejectedValue(error);

      await expect(controller.getPlayers()).rejects.toThrow(
        'Database connection failed',
      );
      expect(service.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return multiple users with correct structure', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      const result = await controller.getPlayers();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('username');
      expect(result[0]).toHaveProperty('password');
    });

    it('should return single user correctly', async () => {
      const singleUser: User[] = [mockUsers[0]];
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(singleUser);

      const result = await controller.getPlayers();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].username).toBe('john_doe');
    });

    it('should call service method exactly once', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      await controller.getPlayers();
      await controller.getPlayers();

      expect(service.findAllUsers).toHaveBeenCalledTimes(2);
    });

    it('should log when fetching players', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      await controller.getPlayers();

      expect(loggerSpy).toHaveBeenCalledWith('Fetching all players');
      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });

    it('should log multiple times when called multiple times', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      await controller.getPlayers();
      await controller.getPlayers();

      expect(loggerSpy).toHaveBeenCalledTimes(2);
      expect(loggerSpy).toHaveBeenNthCalledWith(1, 'Fetching all players');
      expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Fetching all players');
    });

    it('should handle large arrays of users', async () => {
      const largeUserArray: User[] = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        username: `user_${i + 1}`,
        password: `password_${i + 1}`,
      }));

      jest.spyOn(service, 'findAllUsers').mockResolvedValue(largeUserArray);

      const result = await controller.getPlayers();

      expect(result).toHaveLength(1000);
      expect(result[0].id).toBe(1);
      expect(result[999].id).toBe(1000);
    });

    it('should preserve user data integrity', async () => {
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(mockUsers);

      const result = await controller.getPlayers();

      expect(result[0]).toEqual(mockUsers[0]);
      expect(result[1]).toEqual(mockUsers[1]);
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockUsers));
    });
  });
});
