import style from "./Header.module.scss";
import React, { useState } from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/home-user">Profile</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="/" onClick={removeToken}>
              Log out
            </Link>
          ),
          key: "1",
        },
      ]}
    />
  );
  // var token = localStorage.getItem("token");
  function removeToken() {
    return localStorage.removeItem("token");
  }

  // const [current, setCurrent] = useState("mail");
  return (
    <div className={style.menuTop}>
      <div className={style.icon}>
        <img
          alt="icon"
          src="data:image/png;base64,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"
        />
      </div>
      <div className={style.menuBody}>
        <Menu mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key={"/home-request"}>
            <Link className={style.router} to="/home-request">
              <span>Quản lí đề xuất</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/home-user"}>
            <Link className={style.router} to="/home-user">
              <span>Quản lí người dùng</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/home-setting"}>
            <Link className={style.router} to="/home-setting">
              <span>Cài đặt chung</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={style.userBox}>
        <Avatar className="avatar" size="small" icon={<UserOutlined />} />

        <Dropdown overlay={menu} trigger={["click"]}>
          <a href = '/' onClick={(e) => e.preventDefault()}>
            <Space>srquest.test1@yopmail.com</Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
