import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup and return AuthResponseDto', async () => {
      const authRequestDto: AuthRequestDto = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedResponse: AuthResponseDto = {
        accessToken: 'test_token',
        user: { id: 1, username: 'testuser' },
      };

      mockAuthService.signup.mockResolvedValue(expectedResponse);

      expect(mockAuthService.signup).toHaveBeenCalledWith(authRequestDto);
      expect(await authController.signup(authRequestDto)).toStrictEqual(
        expectedResponse,
      );
    });
  });

  describe('signin', () => {
    it('should call authService.signin and return AuthResponseDto', async () => {
      const authRequestDto: AuthRequestDto = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedResponse: AuthResponseDto = {
        accessToken: 'test_token',
        user: { id: 1, username: 'testuser' },
      };

      mockAuthService.signin.mockResolvedValue(expectedResponse);

      expect(mockAuthService.signin).toHaveBeenCalledWith(authRequestDto);
      expect(await authController.signin(authRequestDto)).toStrictEqual(
        expectedResponse,
      );
    });
  });
});
