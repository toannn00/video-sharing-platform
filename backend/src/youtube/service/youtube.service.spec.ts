import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockApiKey = 'test-api-key';
  const mockVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const mockVideoId = 'dQw4w9WgXcQ';

  const mockYoutubeResponse: AxiosResponse = {
    data: {
      items: [
        {
          snippet: {
            title: 'Test Video',
            description: 'Test Description',
          },
        },
      ],
    },
    status: 200,
    statusText: 'OK',
    config: {
      headers: new AxiosHeaders(),
    },
    headers: new AxiosHeaders(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YoutubeService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(mockApiKey),
          },
        },
      ],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock logger to prevent console output during tests
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getVideoId', () => {
    it('should extract video ID from YouTube URL', () => {
      const result = (service as any).getVideoId(mockVideoUrl);
      expect(result).toBe(mockVideoId);
    });

    it('should return null for invalid YouTube URL', () => {
      const result = (service as any).getVideoId('https://invalid-url.com');
      expect(result).toBeNull();
    });

    it('should handle empty or undefined URL', async () => {
      const emptyResult = await service.getVideoDetails('');
      const undefinedResult = await service.getVideoDetails(undefined);
      const nullResult = await service.getVideoDetails(null);

      expect(emptyResult).toBeNull();
      expect(undefinedResult).toBeNull();
      expect(nullResult).toBeNull();
    });
  });

  describe('getVideoDetails', () => {
    it('should return video details for valid YouTube URL', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockYoutubeResponse));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toEqual({
        title: 'Test Video',
        description: 'Test Description',
      });
      expect(httpService.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'snippet',
            id: mockVideoId,
            key: mockApiKey,
          },
        },
      );
    });

    it('should return null for invalid YouTube URL', async () => {
      const result = await service.getVideoDetails('https://invalid-url.com');
      expect(result).toBeNull();
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should return null when no items found in YouTube response', async () => {
      const emptyResponse = { ...mockYoutubeResponse, data: { items: [] } };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(emptyResponse));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });

    it('should return null when API call fails', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => new Error('API Error')));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });

    it('should return null when API returns invalid data', async () => {
      const invalidResponse = { ...mockYoutubeResponse, data: { items: [{}] } };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(invalidResponse));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });

    it('should return null when API key is not configured', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce(undefined);

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });

    it('should handle network errors gracefully', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => new Error('Network Error')));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });

    it('should handle malformed response data gracefully', async () => {
      const malformedResponse = { ...mockYoutubeResponse, data: 'invalid' };
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(malformedResponse as any));

      const result = await service.getVideoDetails(mockVideoUrl);

      expect(result).toBeNull();
    });
  });
});
