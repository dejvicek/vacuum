import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService = {
    findByUsername: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    const authRequestDto = { username: 'testuser', password: 'password123' };
    const hashedPassword = 'hashed_password_123';
    const newUser = { id: 1, username: 'testuser', password: hashedPassword };

    it('should successfully register a new user', async () => {
      mockUserService.findByUsername.mockResolvedValue([]);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserService.createUser.mockResolvedValue([newUser]);
      mockJwtService.sign.mockReturnValue('test_token');

      expect(mockUserService.findByUsername).toHaveBeenCalledWith(
        authRequestDto.username,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(authRequestDto.password, 10);
      expect(mockUserService.createUser).toHaveBeenCalledWith(
        authRequestDto.username,
        hashedPassword,
      );
      expect(await authService.signup(authRequestDto)).toStrictEqual({
        accessToken: 'test_token',
        user: { id: 1, username: 'testuser' },
      });
    });

    it('should throw BadRequestException when username already exists', async () => {
      mockUserService.findByUsername.mockResolvedValue([newUser]);

      await expect(authService.signup(authRequestDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserService.createUser).not.toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    const authRequestDto = { username: 'testuser', password: 'password123' };
    const hashedPassword = 'hashed_password_123';
    const user = { id: 1, username: 'testuser', password: hashedPassword };

    it('should successfully sign in an existing user with correct password', async () => {
      mockUserService.findByUsername.mockResolvedValue([user]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('test_token');

      expect(mockUserService.findByUsername).toHaveBeenCalledWith(
        authRequestDto.username,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        authRequestDto.password,
        hashedPassword,
      );
      expect(await authService.signin(authRequestDto)).toStrictEqual({
        accessToken: 'test_token',
        user: { id: 1, username: 'testuser' },
      });
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      mockUserService.findByUsername.mockResolvedValue([]);

      await expect(authService.signin(authRequestDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      mockUserService.findByUsername.mockResolvedValue([user]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.signin(authRequestDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        authRequestDto.password,
        hashedPassword,
      );
    });
  });
});
