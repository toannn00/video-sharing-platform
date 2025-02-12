import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './schema/video.schema';
import { YoutubeModule } from '../youtube/youtube.module';
import { NotificationGateway } from '../notification/notification.gateway';

@Module({
  imports: [
    AuthModule,
    YoutubeModule,
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  controllers: [VideoController],
  providers: [VideoService, NotificationGateway],
})
export class VideoModule {}
