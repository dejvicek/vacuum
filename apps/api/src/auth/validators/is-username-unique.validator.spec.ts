import { Test, TestingModule } from '@nestjs/testing';
import { IsUsernameUniqueConstraint } from './is-username-unique.validator';
import { UserService } from '../../user/user.service';

describe('IsUsernameUniqueConstraint', () => {
  let validator: IsUsernameUniqueConstraint;
  let userService: UserService;

  const mockUserService = {
    findByUsername: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUsernameUniqueConstraint,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    validator = module.get<IsUsernameUniqueConstraint>(
      IsUsernameUniqueConstraint,
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('validate', () => {
    it('should return true when username does not exist', async () => {
      const username = 'newuser';
      mockUserService.findByUsername.mockResolvedValue([]);

      expect(userService.findByUsername).toHaveBeenCalledWith(username);
      expect(await validator.validate(username)).toBe(true);
    });

    it('should return false when username already exists', async () => {
      const username = 'existinguser';
      const existingUser = {
        id: 1,
        username: 'existinguser',
        password: 'hash',
      };
      mockUserService.findByUsername.mockResolvedValue([existingUser]);

      expect(userService.findByUsername).toHaveBeenCalledWith(username);
      expect(await validator.validate(username)).toBe(false);
    });

    it('should return false when multiple users with same username exist', async () => {
      const username = 'duplicateuser';
      const users = [
        { id: 1, username: 'duplicateuser', password: 'hash1' },
        { id: 2, username: 'duplicateuser', password: 'hash2' },
      ];
      mockUserService.findByUsername.mockResolvedValue(users);

      expect(userService.findByUsername).toHaveBeenCalledWith(username);
      expect(await validator.validate(username)).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    it('should return correct validation message', () => {
      const message = validator.defaultMessage();

      expect(message).toBe('Username "$value" already exists');
    });
  });
});
