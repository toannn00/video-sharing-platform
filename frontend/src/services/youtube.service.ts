import axios, { AxiosError } from "axios";
import { message } from "antd";

interface YouTubeVideoDetails {
  title: string;
  description: string;
}

class YouTubeService {
  private readonly API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

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
        message.error("Invalid YouTube URL");
        return null;
      }

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: "snippet",
            id: videoId,
            key: this.API_KEY,
          },
        }
      );

      const data = response.data;
      if (data.items && data.items.length > 0) {
        const videoDetails = data.items[0].snippet;
        return {
          title: videoDetails.title,
          description: videoDetails.description,
        };
      }

      message.error("Video not found");
      return null;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.error("YouTube API error:", {
          status: err.response.status,
          data: err.response.data,
        });
        message.error(`Error fetching video details: ${err.response.status}`);
      } else {
        console.error("YouTube API error:", err.message);
        message.error("Error connecting to YouTube API");
      }
      return null;
    }
  }
}

export default new YouTubeService();
