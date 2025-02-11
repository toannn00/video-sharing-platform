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

export const Post = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelAlign="left"
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
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button danger onClick={back}>
            <ArrowLeftOutlined /> Back
          </Button>
          <Button onClick={formClear}>
            <ReloadOutlined /> Clear
          </Button>
          <Button
            style={{ backgroundColor: "black" }}
            htmlType="submit"
            type="primary"
            loading={loading}
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
