import { useMemo } from "react";
import Video from "../../types/video.type";
import { Empty } from "antd";
import VideoItem from "../VideoItem";
import { useMediaQuery } from "react-responsive";

export const VideoList = ({ videoList }: { videoList: Video[] }) => {
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
      {videoList.length > 0 ? (
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
