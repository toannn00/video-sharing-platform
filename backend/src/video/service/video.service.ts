import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Video } from '../schema/video.schema';
import { User } from '../../auth/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { YoutubeService } from '../../youtube/service/youtube.service';
import { NotificationGateway } from '../../notification/notification.gateway';

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

  async create(video: Video, user: User): Promise<Video | null> {
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
          if (videoDetails) {
            videoData = {
              ...videoData,
              title: video.title || videoDetails.title,
              description: video.description || videoDetails.description,
            };
          }
        } catch (youtubeError) {
          this.logger.warn('Error fetching YouTube details:', youtubeError);
        }
      }

      const createdVideo = await this.videoModel.create(videoData);

      this.notificationGateway.handleMessage({
        title: createdVideo.title,
        email: user.email,
      });

      return createdVideo;
    } catch (error) {
      this.logger.error('Error creating video:', error);
      return null;
    }
  }
}
