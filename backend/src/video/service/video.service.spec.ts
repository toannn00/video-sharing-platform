import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from '../schema/video.schema';
import { User } from '../../auth/schema/user.schema';

describe('VideoService', () => {
  const mockUser = {
    _id: '1337',
    email: 'test@gmail.com',
    password: 'test1234',
  } as User;

  const mockVideo = {
    title: 'Test Video',
    description: 'Test Description',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    email: mockUser.email,
    user: mockUser._id,
  };

  const mockVideos = [mockVideo];

  let videoService: VideoService;
  const mockVideoModel = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockResolvedValue(mockVideos),
    create: jest.fn().mockResolvedValue(mockVideo),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: mockVideoModel,
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all videos sorted by createdAt in descending order', async () => {
      mockVideoModel.find.mockImplementation(() => ({
        sort: jest.fn().mockResolvedValue(mockVideos),
      }));

      const result = await videoService.findAll();

      expect(result).toEqual(mockVideos);
      expect(mockVideoModel.find).toHaveBeenCalledWith(
        {},
        {
          title: 1,
          description: 1,
          url: 1,
          email: 1,
          _id: 0,
        },
      );
    });
  });

  describe('create', () => {
    it('should create a new video with user data', async () => {
      const result = await videoService.create(mockVideo as Video, mockUser);

      expect(result).toEqual(mockVideo);
      expect(mockVideoModel.create).toHaveBeenCalledWith({
        ...mockVideo,
        user: mockUser._id,
        email: mockUser.email,
      });
    });

    it('should assign user email and id to the video', async () => {
      const videoWithoutUser = {
        title: 'Test Video',
        description: 'Test Description',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      };

      await videoService.create(videoWithoutUser as Video, mockUser);

      expect(mockVideoModel.create).toHaveBeenCalledWith({
        ...videoWithoutUser,
        user: mockUser._id,
        email: mockUser.email,
      });
    });
  });
});
