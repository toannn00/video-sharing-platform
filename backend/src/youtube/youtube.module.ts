import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YoutubeService } from './service/youtube.service';

@Module({
  imports: [HttpModule],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}
