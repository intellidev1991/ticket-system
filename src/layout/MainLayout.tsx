import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  BorderOutlined,
  DesktopOutlined,
  SnippetsOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { tools } from "@/utility/tools";
import { Statistic } from "@/components/Statistic";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "",
    icon: React.createElement(PieChartOutlined),
    label: `Dashboard`,
  },
  {
    key: "user",
    icon: React.createElement(UserOutlined),
    label: `Add User`,
  },
  {
    key: "movie",
    icon: React.createElement(VideoCameraOutlined),
    label: `Add Movie`,
  },
  {
    key: "theater",
    icon: React.createElement(BorderOutlined),
    label: `Add Theater`,
  },
  {
    key: "show",
    icon: React.createElement(DesktopOutlined),
    label: `Add Show`,
  },
  {
    key: "ticket",
    icon: React.createElement(SnippetsOutlined),
    label: `Register a ticket`,
  },
];

interface IMainLayout {}

const MainLayout: React.FC<IMainLayout> = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  const location = window.location.pathname.split("/")[1];

  return (
    <Layout hasSider>
      <Sider
        className="overflow-auto min-h-screen h-full fixed left-0 top-0 bottom-0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="text-gray-300 w-full p-4 text-center text-lg font-semibold">
          Ticket System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location] as MenuProps["defaultSelectedKeys"]}
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="h-screen overflow-y-auto">
        <Header className="p-0" style={{ background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="font-semibold text-2xl text-center mt-2">
            {location ? `${tools.capitalize(location)} Page` : "Dashboard"}
          </div>
        </Header>
        <Content className="p-4 relative">
          <div className="p-6">
            {!location && <Statistic />}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export { MainLayout };
