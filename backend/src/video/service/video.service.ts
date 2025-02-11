import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Video } from '../schema/video.schema';
import { User } from '../../auth/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private videoModel: mongoose.Model<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
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
  }

  async create(video: Video, user: User): Promise<Video> {
    const data = Object.assign(video, { user: user._id, email: user.email });

    const createdVideo = await this.videoModel.create(data);
    return createdVideo;
  }
}
