import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Video } from '../schema/video.schema';
import { User } from '../../auth/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { YoutubeService } from '../../youtube/service/youtube.service';
import { NotificationGateway } from '../../notification/notification.gateway';

interface VideoResponse {
  video: Video | null;
  status: {
    code: number;
    message: string;
  };
}

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    @InjectModel(Video.name)
    private videoModel: mongoose.Model<Video>,
    private youtubeService: YoutubeService,
    private notificationGateway: NotificationGateway,
  ) {}

  async findAll(): Promise<Video[]> {
    try {
      const videos = await this.videoModel
        .find(
          {},
          {
            title: 1,
            description: 1,
            url: 1,
            email: 1,
            _id: 0,
          },
        )
        .sort({ createdAt: -1 });

      return videos;
    } catch (error) {
      this.logger.error('Error finding videos:', error);
      return [];
    }
  }

  async create(video: Video, user: User): Promise<VideoResponse> {
    try {
      let videoData = {
        ...video,
        user: user._id,
        email: user.email,
      };

      if (!video.title || !video.description) {
        try {
          const videoDetails = await this.youtubeService.getVideoDetails(
            video.url,
          );

          if (!videoDetails) {
            this.logger.warn('Failed to fetch video details from YouTube');
            return {
              video: null,
              status: {
                code: 422,
                message: 'Failed to fetch video details from YouTube',
              },
            };
          }

          videoData = {
            ...videoData,
            title: video.title || videoDetails.title,
            description: video.description || videoDetails.description,
          };

          const createdVideo = await this.videoModel.create(videoData);

          this.notificationGateway.handleMessage({
            title: createdVideo.title,
            email: user.email,
          });

          return {
            video: createdVideo,
            status: {
              code: 201,
              message: 'Video created successfully',
            },
          };
        } catch (youtubeError) {
          this.logger.warn('Error fetching YouTube details:', youtubeError);
          return {
            video: null,
            status: {
              code: 422,
              message: 'Error fetching YouTube video details',
            },
          };
        }
      }

      const createdVideo = await this.videoModel.create(videoData);

      this.notificationGateway.handleMessage({
        title: createdVideo.title,
        email: user.email,
      });

      return {
        video: createdVideo,
        status: {
          code: 201,
          message: 'Video created successfully',
        },
      };
    } catch (error) {
      this.logger.error('Error creating video:', error);
      return {
        video: null,
        status: {
          code: 500,
          message: 'Internal server error while creating video',
        },
      };
    }
  }
}
