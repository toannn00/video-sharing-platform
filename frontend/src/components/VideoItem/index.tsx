import { lazy, Suspense } from "react";
import Video from "../../types/video.type";
import { Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";

const ReactPlayer = lazy(() => import("react-player"));

export const VideoItem = ({ video }: { video: Video }) => {
  const { title, description, url, email } = video;
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const truncate = (text: string) => {
    return text.length > 200 ? text.substring(0, 200) + "..." : text;
  };

  const renderPlayer = () => {
    if (!inView) return <div style={{ height: 240, background: "#f0f0f0" }} />;

    return (
      <Suspense
        fallback={<div style={{ height: 240, background: "#f0f0f0" }} />}
      >
        <ReactPlayer
          width={isMobile ? "100%" : 426}
          height={240}
          url={url}
          light={true}
          playing={false}
        />
      </Suspense>
    );
  };

  if (isMobile) {
    return (
      <Row gutter={10} style={{ padding: 16 }} data-testid="movie-item">
        <Col span={24}>
          <div ref={ref} style={{ textAlign: "center", marginBottom: 16 }}>
            {renderPlayer()}
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
        <div ref={ref} style={{ textAlign: "right" }}>
          {renderPlayer()}
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
