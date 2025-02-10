import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

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

    it('should throw BadRequestException when email is empty', async () => {
      const invalidUser = {
        email: '',
        password: 'test1234',
      };

      mockAuthService.signIn.mockRejectedValueOnce(
        new BadRequestException('email should not be empty'),
      );

      await expect(authController.login(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when email format is invalid', async () => {
      const invalidUser = {
        email: 'invalid-email',
        password: 'test1234',
      };

      mockAuthService.signIn.mockRejectedValueOnce(
        new BadRequestException('Enter valid email'),
      );

      await expect(authController.login(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when password is empty', async () => {
      const invalidUser = {
        email: 'test@gmail.com',
        password: '',
      };

      mockAuthService.signIn.mockRejectedValueOnce(
        new BadRequestException('password should not be empty'),
      );

      await expect(authController.login(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when password length is less than 8 characters', async () => {
      const invalidUser = {
        email: 'test@gmail.com',
        password: '123',
      };

      mockAuthService.signIn.mockRejectedValueOnce(
        new BadRequestException(
          'password must be longer than or equal to 8 characters',
        ),
      );

      await expect(authController.login(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when password is not a string', async () => {
      const invalidUser = {
        email: 'test@gmail.com',
        password: 12345678,
      } as any;

      mockAuthService.signIn.mockRejectedValueOnce(
        new BadRequestException('password must be a string'),
      );

      await expect(authController.login(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
