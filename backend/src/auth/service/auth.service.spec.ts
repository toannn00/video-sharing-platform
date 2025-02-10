import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  const mockUser = {
    _id: '1337',
    email: 'test@gmail.com',
    password: 'test1234',
  };

  const mockToken = 'mock.jwt.token';

  let authService: AuthService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => mockToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => mockUser.password);

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(mockUser);
      const result = await authService.signIn(mockUser);
      expect(result).toEqual({ token: mockToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: mockUser._id });
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      await expect(authService.signIn(mockUser)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('signUp', () => {
    it('should successfully sign up a new user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce(mockUser);
      const result = await authService.signUp(mockUser);
      expect(result).toEqual({ token: mockToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: mockUser._id });
    });

    it('should hash password before saving', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce(mockUser);
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await authService.signUp(mockUser);

      expect(hashSpy).toHaveBeenCalledWith(mockUser.password, 10);
      expect(mockUserModel.create).toHaveBeenCalled();
    });

    it('should create JWT token after successful signup', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce(mockUser);

      const result = await authService.signUp(mockUser);

      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: mockUser._id });
      expect(result).toEqual({ token: mockToken });
    });
  });
});
