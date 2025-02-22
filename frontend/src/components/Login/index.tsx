import { Form, Input, Button, Row, Col } from "antd";
import UserBar from "../UserBar";
import User from "../../types/user.type";
import { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogout = () => {
    authService.logout();
    setEmail("");
    navigate("/");
  };

  const handleLogin = async (values: User) => {
    setLoading(true);
    try {
      const res = await authService.login({
        email: values.email,
        password: values.password,
      });

      if (res) {
        setEmail(values.email);
        window.dispatchEvent(new Event("authChange"));
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
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
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : 600,
        padding: isMobile ? "0 16px" : 0,
      }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoComplete="off"
      layout={isMobile ? "vertical" : "horizontal"}
    >
      <Row gutter={[isMobile ? 0 : 8, isMobile ? 8 : 0]}>
        <Col span={getColumnSpans()}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Enter a valid email", type: "email" },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Email"
              type="email"
              style={{ fontSize: "16px" }}
            />
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
            <Input.Password
              placeholder="Password"
              style={{ fontSize: "16px" }}
            />
          </Form.Item>
        </Col>
        <Col span={getButtonSpan()}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              style={{ backgroundColor: "black" }}
              htmlType="submit"
              type="primary"
              loading={loading}
              block={isMobile}
            >
              Login/Register
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
