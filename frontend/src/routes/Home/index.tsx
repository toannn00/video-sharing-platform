import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import VideoList from "../../components/VideoList";
import Video from "../../types/video.type";
import videoService from "../../services/video.service";

export const Home = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);

  const getVideos = async () => {
    const data = (await videoService.getAll()) as Video[];
    setVideoList(data);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Layout>
      <VideoList videoList={videoList} />
    </Layout>
  );
};
