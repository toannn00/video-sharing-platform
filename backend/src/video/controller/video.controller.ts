import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { VideoService } from '../service/video.service';
import { Video } from '../schema/video.schema';
import { VideoDto } from '../dto/video.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  async getAllVideos(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createVideo(@Body() video: VideoDto, @Req() req): Promise<Video> {
    const response = await this.videoService.create(video, req.user);
    if (!response.video) {
      throw new HttpException(response.status.message, response.status.code);
    }
    return response.video;
  }
}
