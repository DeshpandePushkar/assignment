import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "./components/MainLayout";
import Authentication from "./components/Authentication";
import Authorization from "./components/Authorization";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Dashboard";
import AssembleBike from "./components/AssembleBike";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<Authentication />}>
        <Route path="portal" element={<MainLayout />}>
          <Route element={<Authorization allowedRoles={["admin"]} />}>
            <Route path="/portal/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<Authorization allowedRoles={["employee"]} />}>
            <Route path="/portal/assemble-bike" element={<AssembleBike />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: "rgb(20, 168, 0)",
            colorTextHeading: "rgb(255, 255, 255)",
          },
        },
        token: {
          algorithm: "compactAlgorithm",
          // Seed Token
          colorPrimary: "#1677ff",
          borderRadius: 11,
          fontFamily: "Arial",
          colorTextBase: "#455560",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
