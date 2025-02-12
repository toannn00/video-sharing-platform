import { useMemo } from "react";
import Video from "../../types/video.type";
import { Empty, Spin } from "antd";
import VideoItem from "../VideoItem";
import { useMediaQuery } from "react-responsive";

export const VideoList = ({
  videoList,
  loading,
}: {
  videoList: Video[];
  loading: boolean;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1280 });

  const containerStyle = useMemo(
    () => ({
      width: isMobile ? "100%" : "70%",
      margin: isMobile ? "20px auto" : "40px auto 0",
      padding: isMobile ? 10 : 30,
    }),
    [isMobile]
  );

  return (
    <div style={containerStyle}>
      {loading ? (
        <Spin size="large" />
      ) : videoList.length > 0 ? (
        videoList.map((video, index) => (
          <VideoItem key={`${video.url}-${index}`} video={video} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default VideoList;
