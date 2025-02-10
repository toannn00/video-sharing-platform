import { Form, Input, Button, Row, Col } from "antd";
import UserBar from "../UserBar";
import User from "../../types/user.type";
import { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogout = () => {
    authService.logout();
    setEmail("");
    navigate("/");
  };

  const handleLogin = async (values: User) => {
    const res = await authService.login({
      email: values.email,
      password: values.password,
    });

    if (res) {
      setEmail(values.email);
    }
  };

  const getColumnSpans = () => {
    return isMobile ? 24 : 9;
  };

  const getButtonSpan = () => {
    return isMobile ? 24 : 6;
  };

  if (email) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "0",
          alignItems: isMobile ? "stretch" : "center",
        }}
      >
        <UserBar email={email} />
        <Button danger onClick={handleLogout} block={isMobile}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Form
      name="login-form"
      wrapperCol={{ span: 24 }}
      style={{ width: "100%", maxWidth: isMobile ? "100%" : 600 }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoComplete="off"
      layout={isMobile ? "vertical" : "horizontal"}
    >
      <Row gutter={[8, isMobile ? 8 : 0]}>
        <Col span={getColumnSpans()}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Enter a valid email", type: "email" },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
        </Col>
        <Col span={getColumnSpans()}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Enter at least 8 characters",
                min: 8,
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Col>
        <Col span={getButtonSpan()}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              style={{
                backgroundColor: "black",
                width: isMobile ? "100%" : "auto",
              }}
              type="primary"
              htmlType="submit"
            >
              Login/Register
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
