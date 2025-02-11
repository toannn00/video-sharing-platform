import { Card } from "antd";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import { useMediaQuery } from "react-responsive";

const PostVideo = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Layout>
      <div style={{ 
        width: isMobile ? "100%" : 500, 
        margin: isMobile ? "20px 0" : "40px auto" 
      }}>
        <Card title="Post video" hoverable>
          <Post />
        </Card>
      </div>
    </Layout>
  );
};

export default PostVideo;
