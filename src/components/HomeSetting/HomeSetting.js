import React from "react";
import { Breadcrumb, Menu } from "antd";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const menu = (
  <Menu
    items={[
      {
        label: <a href="">Profile</a>,
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: "Log Out",
        key: "1",
      },
    ]}
  />
);

function HomeSetting() {
  return (
    <React.Fragment>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="../HomeRequest/HomeRequest" className="home-link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Cài đặt chung</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Setting</h1>
    </React.Fragment>
  );
}

export default HomeSetting;
