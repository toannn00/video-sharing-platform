import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

interface YouTubeVideoDetails {
  title: string;
  description: string;
}

@Injectable()
export class YoutubeService {
  private readonly API_KEY: string;
  private readonly logger = new Logger(YoutubeService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.API_KEY = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  private getVideoId(url: string): string | null {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }

  async getVideoDetails(url: string): Promise<YouTubeVideoDetails | null> {
    try {
      const videoId = this.getVideoId(url);
      if (!videoId) {
        return null;
      }

      const { data } = await firstValueFrom(
        this.httpService
          .get<any>('https://www.googleapis.com/youtube/v3/videos', {
            params: {
              part: 'snippet',
              id: videoId,
              key: this.API_KEY,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data);
              throw error;
            }),
          ),
      );

      if (data.items && data.items.length === 0) {
        return null;
      }

      if (data.items && data.items.length > 0) {
        const videoDetails = data.items[0].snippet;
        return {
          title: videoDetails.title,
          description: videoDetails.description,
        };
      }

      return null;
    } catch (error) {
      this.logger.error('YouTube API error:', error.message);
      return null;
    }
  }
}
