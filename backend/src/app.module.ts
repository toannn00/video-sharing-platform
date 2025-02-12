import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { NotificationGateway } from './notification/notification.gateway';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    VideoModule,
    AuthModule,
    YoutubeModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}
