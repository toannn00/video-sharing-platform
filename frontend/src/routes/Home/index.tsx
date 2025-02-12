import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import VideoList from "../../components/VideoList";
import Video from "../../types/video.type";
import videoService from "../../services/video.service";

export const Home = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const getVideos = async () => {
    setLoading(true);
    try {
      const data = await videoService.getAll();
      setVideoList(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Layout>
      <VideoList videoList={videoList} loading={loading} />
    </Layout>
  );
};
