import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/controller/video.controller';
import { VideoService } from './video/service/video.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    VideoModule,
    AuthModule,
  ],
  controllers: [AppController, VideoController, AuthController],
  providers: [AppService, VideoService, AuthService],
})
export class AppModule {}
