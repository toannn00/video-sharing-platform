import { AxiosError } from "axios";
import http from "../http";
import { message } from "antd";
import Video from "../types/video.type";

class VideoService {
  async getAll(): Promise<Video[]> {
    try {
      const response = await http.get<Video[]>("/video");
      return response.data || [];
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.response);
      return [];
    }
  }

  async create(data: Video, token: string): Promise<boolean> {
    try {
      await http.post<Video>("/video", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Posted successfully");
      return true;
    } catch (error) {
      const err = error as AxiosError;
      message.error("An error has been occurred");
      console.error(err.response);
      return false;
    }
  }
}

export default new VideoService();
