import { Form, Button, Input } from "antd";
import {
  ArrowLeftOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import videoService from "../../services/video.service";
import Video from "../../types/video.type";
import { useMediaQuery } from "react-responsive";
import { io, Socket } from "socket.io-client";
import youtubeService from "../../services/youtube.service";

export const Post = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [socket, setSocket] = useState<Socket>();

  const triggerMessage = (values: { message: string; email: string }) => {
    socket?.emit("newVideoNotification", values);
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_WS_URL);
    setSocket(newSocket);
  }, [setSocket]);

  const handleUrlChange = async (url: string) => {
    if (
      url.match(
        /^https?:\/\/(www\.youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+)$/
      )
    ) {
      const details = await youtubeService.getVideoDetails(url);
      if (details) {
        form.setFieldsValue({
          title: details.title,
          description: details.description,
        });
      }
    }
  };

  const onFinish = async (values: Video) => {
    setLoading(true);
    try {
      const result = await videoService.create(values, token);
      const email = localStorage.getItem("email") || "";

      if (result) {
        form.resetFields();
        const notificationMessage = `New video ${values.title} uploaded by ${email}`;
        triggerMessage({ message: notificationMessage, email });
        back();
      }
    } catch (error) {
      console.error("Error posting video:", error);
    } finally {
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
        padding: isMobile ? "0 16px" : 0,
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
        <Input style={{ fontSize: "16px" }} />
      </Form.Item>
      <Form.Item
        label="YouTube URL"
        name="url"
        rules={[
          { required: true, message: "Input valid YouTube URL" },
          {
            pattern: new RegExp(
              "^https?://(www\\.youtube\\.com/watch\\?v=[\\w-]+|youtu\\.be/[\\w-]+)$"
            ),
            message:
              "Input a valid YouTube URL (e.g., https://youtube.com/watch?v=xxxxx or https://youtu.be/xxxxx)",
          },
          {
            transform: (value: string) => value.trim(),
          },
        ]}
      >
        <Input
          style={{ fontSize: "16px" }}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Input valid YouTube description" }]}
      >
        <Input.TextArea style={{ fontSize: "16px" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
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
