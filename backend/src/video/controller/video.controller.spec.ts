import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from '../service/video.service';
import { User } from '../../auth/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';

describe('VideoController', () => {
  const req = {
    user: {
      _id: '1337',
      email: 'test@gmail.com',
      password: 'test1234',
    } as User,
  };

  const mockVideo = {
    title: 'Test Video',
    description: 'Test Description',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    email: req.user.email,
    user: req.user,
  };

  const mockVideos = [mockVideo];

  const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

  let videoController: VideoController;
  const mockVideoService = {
    create: jest.fn().mockResolvedValue(mockVideo),
    findAll: jest.fn().mockResolvedValue(mockVideos),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: mockVideoService,
        },
      ],
    })
      .overrideGuard(AuthGuard())
      .useValue(mockGuard)
      .compile();

    videoController = module.get<VideoController>(VideoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(videoController).toBeDefined();
  });

  describe('getAllVideos', () => {
    it('should return an array of videos', async () => {
      const result = await videoController.getAllVideos();

      expect(result).toEqual(mockVideos);
      expect(mockVideoService.findAll).toHaveBeenCalled();
      expect(mockVideoService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createVideo', () => {
    it('should create a new video', async () => {
      const result = await videoController.createVideo(mockVideo, req);

      expect(result).toEqual(mockVideo);
      expect(mockVideoService.create).toHaveBeenCalledWith(mockVideo, req.user);
      expect(mockVideoService.create).toHaveBeenCalledTimes(1);
    });

    it('should pass the authenticated user to the service', async () => {
      await videoController.createVideo(mockVideo, req);

      expect(mockVideoService.create).toHaveBeenCalledWith(
        expect.any(Object),
        req.user,
      );
    });
  });
});
