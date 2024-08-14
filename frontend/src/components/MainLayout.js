import React from "react";
import { Layout, Button, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Content, Header } = Layout;

function MainLayout() {
  const navigate = useNavigate();

  let href = window.location.href?.split("/");
  href = href.slice(-1);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Header style={{ padding: "0 24px", background: "#fff" }}>
        <Space direction="horizontal" size={20}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("user");
              localStorage.clear();
              navigate("/");
            }}
            style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            Logout
          </Button>
        </Space>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
