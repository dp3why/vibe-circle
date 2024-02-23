import React from "react";
import logo from "../../assets/images/logo.png";
import "./TopBar.css";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Typography, Avatar, Button } from "antd";
const { Header } = Layout;
const { Text } = Typography;
const TopBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <Header
      className="App-header"
      style={{
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        width: "100%",
        display: "flex",
        alignItems: "start",
        paddingLeft: "4em",
        paddingTop: "3em",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          preview={false}
          src={logo}
          alt="logo"
          style={{
            width: "4em",
            height: "4em",
            marginRight: "0.8em",
          }}
        />
        <Text className="App-title" color="#c167fe">
          VibeCircle
        </Text>
      </div>

      {isLoggedIn ? (
        <LogoutOutlined className="logout" onClick={handleLogout} />
      ) : (
        <div>
          <Button
            size="large"
            type="primary"
            style={{
              borderRadius: "15px",
              marginRight: "1em",
            }}
          >
            Login
          </Button>
          <Button
            size="large"
            type="primary"
            style={{
              borderRadius: "15px",
            }}
          >
            Register
          </Button>
        </div>
      )}
    </Header>
  );
};

export default TopBar;
