import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    return this.videoService.create(video, req.user);
  }
}
