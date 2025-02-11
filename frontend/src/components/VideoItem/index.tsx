import ReactPlayer from "react-player";
import Video from "../../types/video.type";
import { Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";

export const VideoItem = ({ video }: { video: Video }) => {
  const { title, description, url, email } = video;
  const isMobile = useMediaQuery({ maxWidth: 1280 });

  const truncate = (text: string) => {
    return text.length > 200 ? text.substring(0, 200) + "..." : text;
  };

  if (isMobile) {
    return (
      <Row gutter={10} style={{ padding: 16 }} data-testid="movie-item">
        <Col span={24}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <ReactPlayer width="100%" height={240} url={url} />
          </div>
        </Col>
        <Col span={24}>
          <div style={{ textAlign: "left" }}>
            <h2 style={{ margin: "0 0 8px" }}>{title}</h2>
            <p style={{ margin: "0 0 8px" }}>
              <b>Uploaded by:</b> {email}
            </p>
            <p style={{ margin: 0 }}>
              <b>Description:</b>
            </p>
            <p style={{ margin: 0 }}>{truncate(description)}</p>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={10} style={{ padding: 16 }} data-testid="movie-item">
      <Col span={10}>
        <div style={{ textAlign: "right" }}>
          <ReactPlayer width={426} height={240} url={url} />
        </div>
      </Col>
      <Col span={10} offset={3}>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ margin: "0 0 8px" }}>{title}</h2>
          <p style={{ margin: "0 0 8px" }}>
            <b>Uploaded by:</b> {email}
          </p>
          <p style={{ margin: 0 }}>
            <b>Description:</b>
          </p>
          <p style={{ margin: 0 }}>{truncate(description)}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoItem;
