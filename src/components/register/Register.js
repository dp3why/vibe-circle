import { Button, Form, Input, message } from "antd";
import React from "react";
import "./Register.css";
import { BASE_URL } from "../../constants";
import axios from "axios";

const fromItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { username, password } = values;
    const opt = {
      method: "POST",
      url: `${BASE_URL}/signup`,
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
          console.log("Register Success");
          props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log("Register Failed", err.message);
        message.error("Register Failed");
      });
  };

  return (
    <Form
      {...fromItemLayout}
      form={form}
      name="register"
      className="register-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="register-btn">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
