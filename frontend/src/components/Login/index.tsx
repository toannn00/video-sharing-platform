import { Form, Input, Button, Row, Col } from "antd";
import UserBar from "../UserBar";
import User from "../../types/user.type";
import { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const navigate = useNavigate();

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

  const onFinish = (values: User) => {
    handleLogin(values);
  };

  return email ? (
    <div style={{ display: "flex" }}>
      <UserBar email={email} />
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <Form
      name="login-form"
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={8}>
        <Col span={9}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Enter a valid email" }]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
        </Col>
        <Col span={9}>
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
        <Col span={6}>
          <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0 }}>
            <Button
              style={{ backgroundColor: "black" }}
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
