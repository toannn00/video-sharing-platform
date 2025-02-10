import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  const mockUser = {
    email: 'test@gmail.com',
    password: 'test1234',
  };

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWM4MGVlM2E0NmVlMTI4NzczNGYxNiIsImlhdCI6MTY4Mzc4NzQ5MiwiZXhwIjoxNjgzODczODkyfQ.n8FTPHNwjpkxZjxae3xvIzQfLDbpecV2sBC6461dx0Y';

  let authController: AuthController;
  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return token on successful login', async () => {
      mockAuthService.signIn.mockResolvedValueOnce({ token: mockToken });

      const res = await authController.login(mockUser);

      expect(res.token).toEqual(mockToken);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(mockUser);
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      mockAuthService.signIn.mockRejectedValueOnce(
        new UnauthorizedException('Invalid email or password'),
      );

      await expect(authController.login(mockUser)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockAuthService.signIn).toHaveBeenCalledWith(mockUser);
    });
  });
});
