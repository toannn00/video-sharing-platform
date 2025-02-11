import { Form, Button, Input } from "antd";
import {
  ArrowLeftOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import videoService from "../../services/video.service";
import Video from "../../types/video.type";
import { useMediaQuery } from "react-responsive";

export const Post = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const onFinish = async (values: Video) => {
    const result = await videoService.create(values, token);

    if (result) {
      form.resetFields();
      setLoading(true);
      back();
    } else {
      setLoading(false);
    }
  };

  const back = () => {
    navigate("/");
  };

  const formClear = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="post-form"
      labelCol={{ span: isMobile ? 24 : 8 }}
      wrapperCol={{ span: isMobile ? 24 : 16 }}
      style={{ 
        width: "100%",
        maxWidth: isMobile ? "100%" : 600,
        padding: isMobile ? "0 16px" : 0
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelAlign={isMobile ? "left" : "right"}
      layout={isMobile ? "vertical" : "horizontal"}
    >
      <Form.Item
        label="Video Title"
        name="title"
        rules={[{ required: true, message: "Input a video title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Youtube URL"
        name="url"
        rules={[
          { required: true, message: "Input valid YouTube URL" },
          {
            pattern: new RegExp("^(https?://)?(www.youtube.com|youtu.be)/.+$"),
            message: "Input a valid YouTube URL",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Input valid YouTube description" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <div style={{ 
          display: "flex", 
          gap: 10, 
          justifyContent: "flex-end",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <Button danger onClick={back} block={isMobile}>
            <ArrowLeftOutlined /> Back
          </Button>
          <Button onClick={formClear} block={isMobile}>
            <ReloadOutlined /> Clear
          </Button>
          <Button
            style={{ backgroundColor: "black" }}
            htmlType="submit"
            type="primary"
            loading={loading}
            block={isMobile}
          >
            <CloudUploadOutlined />
            Post
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Post;
