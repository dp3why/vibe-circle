import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./TopBar.css";
import { UserSwitchOutlined } from "@ant-design/icons";
import { Layout, Typography, Avatar, Button } from "antd";
const { Header } = Layout;
const { Title, Text } = Typography;
const TopBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        width: "100%",
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingLeft: "4em",
        paddingTop: "3em",
        justifyContent: "space-between",
      }}
    >
      <Header
        className="App-header"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
        <Link to="/">
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
            <Text className="App-title">VibeCircle</Text>
          </div>
        </Link>
        {isLoggedIn ? (
          <Button
            icon={<UserSwitchOutlined />}
            size="large"
            type="primary"
            style={{
              borderRadius: "15px",
              marginLeft: "auto",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <div>
            <Link to="/login">
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
            </Link>
            <Link to="/register">
              <Button
                size="large"
                type="primary"
                style={{
                  borderRadius: "15px",
                }}
              >
                Register
              </Button>{" "}
            </Link>
          </div>
        )}
      </Header>
      <div
        className=""
        style={{
          height: "25vh",
        }}
      >
        <Title>
          <Text
            style={{
              color: "white",
              fontSize: "1.2em",
            }}
          >
            A place where you can share your vibes with the world
          </Text>
        </Title>
      </div>
    </div>
  );
};

export default TopBar;
