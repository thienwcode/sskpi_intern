import "antd/dist/antd.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import HomeSetting from "./components/HomeSetting/HomeSetting";
import HomeUser from "./components/HomeUser/HomeUser";
import HomeRequest from "./components/HomeRequest/HomeRequest";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home-request" element={<HomeRequest />}></Route>
      <Route path="/home-setting" element={<HomeSetting />}></Route>
      <Route path="/home-user" element={<HomeUser />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
