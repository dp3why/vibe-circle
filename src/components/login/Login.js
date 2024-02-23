import { Button, Form, Input, message } from "antd";
import React from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ handleLoggedIn }) => {
  const onFinish = (values) => {
    const { username, password } = values;
    const opt = {
      method: "POST",
      url: `${BASE_URL}/signin`,
      data: {
        username,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          handleLoggedIn(data);
          message.success("Login Success");
        }
      })
      .catch((err) => {
        message.error("Login Failed");
      });
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="login-form-button"
        >
          Log In
        </Button>
      </Form.Item>
      Or <Link to="/register">register now!</Link>
    </Form>
  );
};

export default Login;
