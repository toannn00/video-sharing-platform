import { Card } from "antd";
import Layout from "../../components/Layout";
import Post from "../../components/Post";

const PostVideo = () => {
  return (
    <Layout>
      <div style={{ width: 500, margin: "40px auto" }}>
        <Card title="Post video" hoverable>
          <Post />
        </Card>
      </div>
    </Layout>
  );
};

export default PostVideo;
